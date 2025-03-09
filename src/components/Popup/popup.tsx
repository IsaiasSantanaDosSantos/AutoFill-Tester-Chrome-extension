import { useState, useEffect } from "react";

import Splash from "../Splash/splash";
import Loading from "../../animation/loading";

const Popup = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [timer, setTimer] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 2500);

    const loadingTime = setTimeout(() => {
      setTimer(false);
    }, 3500);

    return () => {
      clearTimeout(timer);
      clearTimeout(loadingTime);
    };
  }, []);
  return (
    <div className="">
      {showSplash ? (
        <Splash />
      ) : (
        <div className="flex flex-col justify-center items-center">
          <h1>Buscando campos de formulário na página atual...</h1>
          {timer && (
            <p className="text-base flex justify-end items-end leading-3 mt-5">
              Loading
              <Loading />
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Popup;
