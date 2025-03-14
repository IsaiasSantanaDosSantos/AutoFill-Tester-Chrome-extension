chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "getFields") {
    sendResponse({ message: "Campos coletados do content script!" });
    console.log("sender: ", sender);
  }
});
