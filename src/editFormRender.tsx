import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import EditForm from "./pages/EditForm/editForm";

const urlParams = new URLSearchParams(window.location.search);
const pageUrl = urlParams.get("url");
const savedFields = pageUrl
  ? localStorage.getItem(`editFields_${encodeURIComponent(pageUrl)}`)
  : null;
const initialFields = savedFields ? JSON.parse(savedFields) : {};

console.log("Fields(editFormRender.tsx file): ", savedFields);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EditForm fields={initialFields} onClose={() => window.close()} />
  </StrictMode>
);
