import { useState, useEffect } from "react";

import Splash from "../Splash/splash";
import Loading from "../../animation/loading";
import { FormFields } from "../../util/interfaces";

const Popup = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [timer, setTimer] = useState(true);
  const [useRandomValues, setUseRandomValues] = useState(true);
  const [disableBtn, setDisableBtn] = useState(true);

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

  const handleClick = () => {
    console.log("Clicou!");
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        // Injetando o content script e esperando a execução antes de enviar mensagem
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            files: ["content.js"],
          },
          () => {
            console.log("✅ Content script injetado com sucesso!");
            // Esperando o content script ser carregado antes de enviar a mensagem
            // setTimeout(() => {
            //   chrome.tabs.sendMessage(
            //     tabs[0].id!,
            //     { action: "captureAndSortFields" },
            //     () => {
            //       chrome.tabs.sendMessage(tabs[0].id!, {
            //         action: "getFields",
            //         random: useRandomValues,
            //       });
            //     }
            //   );
            // }, 500);
            setTimeout(() => {
              chrome.tabs.sendMessage(
                tabs[0].id!,
                { action: "getFields" },
                (response) => {
                  const fields = response?.fields;
                  handleSaveStorage(fields);
                  setDisableBtn(false);
                }
              );
            }, 100);
          }
        );
      } else {
        console.error("Nenhuma aba ativa encontrada.");
      }
    });
  };
  const handleSaveStorage = (fields: FormFields[]) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.url) {
        // Armazena no localStorage para recuperar na nova página
        localStorage.setItem(
          `editFields_${encodeURIComponent(tabs[0].url)}`,
          JSON.stringify(fields)
        );
      }
    });
  };

  const openEditForm = () => {
    setTimeout(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.url) {
          const editUrl = chrome.runtime.getURL(
            `/editForm.html?url=${encodeURIComponent(tabs[0].url)}`
          );
          chrome.tabs.create({ url: editUrl });
        }
      });
    }, 500);
  };

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
            <div className="flex items-center mt-4">
              {/* <span>Preencher com valores aleatórios? </span> */}
              <label htmlFor="checkBoxInput" className="switch flex gap-x-3">
                Preencher com valores aleatórios?
                <input
                  type="checkbox"
                  id="checkBoxInput"
                  checked={useRandomValues}
                  onChange={() => setUseRandomValues(!useRandomValues)}
                />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="flex justify-between mt-4 flex-col">
              <button
                className="mt-4 border p-1 font-semibold bg-[var(--bg-color)] text-[var(--text-color)] cursor-pointer transform-[250ms]"
                onClick={handleClick}
              >
                Preencher Formulário
              </button>
              <button
                className={`mt-2 border p-1 font-semibold bg-[var(--bg-color)] text-[var(--text-color)] cursor-pointer transform-[250ms] ${
                  disableBtn ? "btn-disabled" : ""
                }`}
                onClick={openEditForm}
                disabled={disableBtn && true}
              >
                Editar e Salvar Valores
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
