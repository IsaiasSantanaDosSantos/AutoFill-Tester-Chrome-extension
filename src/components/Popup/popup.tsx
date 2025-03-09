import { useState, useEffect } from "react";

import Splash from "../Splash/splash";

const Popup = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="">
      {showSplash ? (
        <Splash />
      ) : (
        <>
          <h1>Home page</h1>
        </>
      )}
    </div>
  );
};

export default Popup;
