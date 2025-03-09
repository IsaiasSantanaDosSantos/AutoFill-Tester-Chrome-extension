/// <reference types="chrome" />

// Definição de tipos para as mensagens recebidas
interface MessageRequest {
    action: "fetchData" | "otherAction"; // Defina os tipos de ações esperados
    data?: Record<string, unknown>; // Melhor do que 'any', aceita objetos desconhecidos
  }
  
  // Definição do tipo para a resposta enviada
  interface MessageResponse {
    status: "ok" | "error";
    message: string;
  }
  
  chrome.runtime.onInstalled.addListener(() => {
    console.log("Extensão instalada e rodando!");
  });
  
  chrome.runtime.onMessage.addListener(
    (
      request: MessageRequest,
      _,
      sendResponse: (response: MessageResponse) => void
    ) => {
      console.log("Mensagem recebida no background:", request);
  
      if (request.action === "fetchData") {
        sendResponse({ status: "ok", message: "Dados recebidos no background" });
      } else {
        sendResponse({ status: "error", message: "Ação desconhecida" });
      }
  
      return true;
    }
  );