// src/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";
import Popup from "./pages/Popup/popup";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Popup />} />
    </Routes>
  );
};

export default AppRoutes;
