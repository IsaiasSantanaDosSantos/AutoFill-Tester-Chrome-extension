import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import "./App.css";

const basename = import.meta.env.MODE === "development" ? "/" : "/index.html";

function App() {
  return (
    <BrowserRouter basename={basename}>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
