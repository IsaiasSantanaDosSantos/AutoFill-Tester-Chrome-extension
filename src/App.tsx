import { BrowserRouter, Routes, Route } from "react-router-dom";
import Popup from "./components/Popup/popup";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Popup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
