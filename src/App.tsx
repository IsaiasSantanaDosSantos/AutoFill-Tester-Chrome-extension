import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import Popup from "./components/Popup/popup";
import Splash from "./components/Splash/splash";
import "./App.css";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return <BrowserRouter>{showSplash ? <Splash /> : <Popup />}</BrowserRouter>;
}

export default App;
