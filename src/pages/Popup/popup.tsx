import { useState, useEffect } from "react";

import Splash from "../Splash/splash";
import Loading from "../../animation/loading";

const Popup = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [timer, setTimer] = useState(true);

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
            <button onClick={handleClick}>Preencher Formulário</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Popup;
