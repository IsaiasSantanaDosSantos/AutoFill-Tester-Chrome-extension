/// <reference types="chrome" />

// Definição de tipos para as mensagens recebidas
interface MessageRequest {
  action: "fetchData" | "otherAction"; // Defina os tipos de ações esperados
  data?: Record<string, unknown>; // Melhor do que 'any', aceita objetos desconhecidos
}

// Definição do tipo para a resposta enviada
// interface MessageResponse {
//   status: "ok" | "error";
//   message: string;
// }

chrome.runtime.onInstalled.addListener(() => {
  console.log("Extensão instalada e rodando!");
});

// chrome.runtime.onMessage.addListener(
//   (
//     request: MessageRequest,
//     _,
//     sendResponse: (response: MessageResponse

//     ) => void
//   ) => {
//     console.log("Mensagem recebida no background:", request);

//     if (request.action === "fetchData") {
//       sendResponse({ status: "ok", message: "Dados recebidos no background" });
//     } else {
//       sendResponse({ status: "error", message: "Ação desconhecida" });
//     }

//     return true;
//   }
// );
chrome.runtime.onMessage.addListener(
  (request: MessageRequest, sender, sendResponse) => {
    console.log("Mensagem recebida no background:", request);
    console.log("sender no background:", sender);

    if (request.action === "fetchData") {
      sendResponse({ status: "ok", message: "Dados recebidos no background" });
    } else {
      sendResponse({ status: "error", message: "Ação desconhecida" });
    }

    return true;
  }
);

if (typeof chrome !== "undefined" && chrome.tabs?.query) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]?.id) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { action: "getFields" },
        (response) => {
          console.log(response);
        }
      );
    }
  });
} else {
  console.log("chrome.tabs.query não está disponível.");
}

chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["content.js"],
    });
  }
});
