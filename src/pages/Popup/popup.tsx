import { useState, useEffect } from "react";

import Splash from "../Splash/splash";
import Loading from "../../animation/loading";

const Popup = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [timer, setTimer] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    const loadingTime = setTimeout(() => {
      setTimer(false);
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(loadingTime);
    };
  }, []);

  useEffect(() => {
    const button = document.getElementById("botaoPreencher");

    if (!button) return;

    const handleClick = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          // Injetando o content script e esperando a execução antes de enviar mensagem
          chrome.scripting.executeScript(
            {
              target: { tabId: tabs[0].id },
              files: ["content.js"],
            },
            (injectionResults) => {
              if (chrome.runtime.lastError) {
                console.error(
                  "Erro ao injetar script:",
                  chrome.runtime.lastError.message
                );
                console.log("injectionResults: ", injectionResults);
                return;
              }

              console.log("✅ Content script injetado com sucesso!");

              // Esperando o content script ser carregado antes de enviar a mensagem
              setTimeout(() => {
                chrome.tabs.sendMessage(
                  tabs[0].id!,
                  { action: "getFields" },
                  (response) => {
                    if (chrome.runtime.lastError) {
                      console.error(
                        "Erro ao enviar mensagem:",
                        chrome.runtime.lastError.message
                      );
                    } else {
                      console.log("Resposta do content script:", response);
                    }
                  }
                );
              }, 500); // Pequeno delay para garantir que o script carregou
            }
          );
        } else {
          console.error("Nenhuma aba ativa encontrada.");
        }
      });
    };

    // const handleClick = () => {
    //   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //     if (tabs[0]?.id) {
    //       // Injetando o content script antes de enviar mensagem
    //       chrome.scripting.executeScript(
    //         {
    //           target: { tabId: tabs[0].id },
    //           files: ["content.js"],
    //         },
    //         () => {
    //           if (chrome.runtime.lastError) {
    //             console.error(
    //               "Erro ao injetar script:",
    //               chrome.runtime.lastError.message
    //             );
    //             return;
    //           }

    //           // Agora podemos enviar a mensagem
    //           chrome.tabs.sendMessage(
    //             tabs[0].id!,
    //             { action: "getFields" },
    //             (response) => {
    //               if (chrome.runtime.lastError) {
    //                 console.error(
    //                   "Erro ao enviar mensagem:",
    //                   chrome.runtime.lastError.message
    //                 );
    //               } else {
    //                 console.log("Resposta do content script:", response);
    //               }
    //             }
    //           );
    //         }
    //       );
    //     } else {
    //       console.error("Nenhuma aba ativa encontrada.");
    //     }
    //   });
    // };

    button.addEventListener("click", handleClick);

    return () => {
      button.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div className="">
      {showSplash ? (
        <Splash />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1>Buscando campos de formulário na página atual...</h1>
          {timer && (
            <p className="text-base flex justify-end items-end leading-3 mt-5">
              Loading
              <Loading />
            </p>
          )}
          <div>
            <h1>AutoFill Tester</h1>
            <button id="botaoPreencher">Preencher Formulário</button>
          </div>
          <ul>
            {/* {fields.map((field, index) => (
              <li className="border-b py-2" key={index}>
                <strong>{field.label}</strong> -{" "}
                <span className="text-gray-600">{field.type}</span> -
                <span className="text-blue-500">{field.suggestedType}</span>
              </li>
            ))} */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Popup;

// interface FormField {
//   name: string;
//   type: string;
//   label: string;
//   suggestedType: string;
//   element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement; // Corrigido
// }

// const [fields, setFields] = useState<FormField[]>([]);

// function getAllFormFields() {
//   console.log("Chamou a função 'getAllFormFields'!");
//   const fields: FormField[] = [];

//   // Seleciona todos os inputs, selects e textareas
//   const formElements = document.querySelectorAll<
//     HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//   >("input, select, textarea");

//   formElements.forEach((element) => {
//     const name = element.name || element.id || "";
//     const type =
//       element.tagName.toLowerCase() === "input"
//         ? element.type
//         : element.tagName.toLowerCase();
//     const placeholder = element.getAttribute("placeholder") || "";
//     const label = findLabelForElement(element) || placeholder || name;

//     fields.push({
//       name,
//       type,
//       label,
//       suggestedType: getFieldType(name, placeholder),
//       element,
//     });
//   });

//   console.log("formElements: ", formElements);
// }

// function findLabelForElement(
//   element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
// ): string | null {
//   if (element.labels && element.labels.length > 0) {
//     return element.labels[0].innerText.trim();
//   }

//   const id = element.id;

//   if (id) {
//     const label = document.querySelector(`label[for="${id}"]`);
//     if (label) return (label as HTMLElement).innerText.trim();
//   }

//   return null;
// }

// function getFieldType(name: string, placeholder: string): string {
//   const text = (name + " " + placeholder).toLowerCase();

//   if (text.includes("cpf")) return "CPF";
//   if (text.includes("cnpj")) return "CNPJ";
//   if (text.includes("email")) return "E-mail";
//   if (text.includes("telefone") || text.includes("celular"))
//     return "Telefone";
//   if (text.includes("cep")) return "CEP";
//   if (text.includes("endereço")) return "Endereço";
//   if (text.includes("rg")) return "RG";
//   if (text.includes("cartão") || text.includes("credito"))
//     return "Cartão de Crédito";

//   return "Texto Genérico";
// }

// if (typeof chrome !== "undefined" && chrome.runtime?.onMessage) {
//   chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if (request.action === "getFields") {
//       sendResponse(getAllFormFields());
//     }
//     console.log("sender: ", sender);
//   });
// } else {
//   console.log("chrome.runtime.onMessage não está disponível no popup.");
// }

// if (typeof chrome !== "undefined" && chrome.tabs?.query) {
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     if (tabs[0]?.id) {
//       chrome.tabs.sendMessage(
//         tabs[0].id,
//         { action: "getFields" },
//         (response) => {
//           if (response) setFields(response);
//         }
//       );
//     }
//   });
// } else {
//   console.log("chrome.tabs.query não está disponível.");
// }
