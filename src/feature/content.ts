// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "getFields") {
//     sendResponse({ message: "Campos coletados do content script!" });
//     console.log("sender: ", sender);
//   }
// });

console.log("✅ Content script carregado!");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("📩 Mensagem recebida no content script:", request);

  if (request.action === "getFields") {
    console.log("sender: ", sender);
    const fields = Array.from(
      document.querySelectorAll("input, textarea, select")
    ).map((el) => ({
      name: el.getAttribute("name") || el.id || "sem_nome",
      type: el.tagName.toLowerCase(),
      value: (el as HTMLInputElement).value || "",
    }));

    sendResponse({ fields });
    console.log("Campos coletados:", fields);
  }
});
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.action === "getFields") {
//     sendResponse({ message: "Campos coletados do content script!" });
//     console.log("sender: ", sender);
//   }
// });
// if (typeof chrome !== "undefined" && chrome.runtime?.onMessage) {
// } else {
//   console.log("chrome.runtime.onMessage não está disponível no popup.");
// }

// const port = chrome.runtime.connect({ name: "content-script" });
// port.postMessage({ action: "init" });

// port.onMessage.addListener((msg) => {
//   console.log("Mensagem recebida no content script:", msg);
// });

// StackOverflow

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   console.log(request, sender, sendResponse);
//   sendResponse("我收到你的消息了：" + JSON.stringify("request"));
// });
