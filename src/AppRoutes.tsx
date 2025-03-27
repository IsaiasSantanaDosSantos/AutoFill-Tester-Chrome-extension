import { Routes, Route } from "react-router-dom";
import Popup from "./pages/Popup/popup";
// import EditForm from "./pages/EditForm/editForm";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Popup />} />
      <Route
        path="/editForm"
        // element={<EditForm fields={{}} onClose={() => {}} />}
      />
    </Routes>
  );
};

export default AppRoutes;
