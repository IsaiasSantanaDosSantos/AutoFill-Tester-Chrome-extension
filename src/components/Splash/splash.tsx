import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import Loading from "../../animation/loading";

const Splash = () => {
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(true);
  }, []);

  return (
    <div className="w-auto h-auto flex flex-col justify-center items-center">
      <h1 className="text-3xl mb-0 font-bold text-center">AutoFill Tester</h1>
      <p className="text-xs mb-5 text-center">
        Preenchimento de formulários <br /> automático para teste.
      </p>
      <motion.img
        src="icon128.png"
        alt="Icon app"
        className="size-30 m-auto items-end"
        initial={{ scale: 0, rotateY: 0 }}
        animate={animation ? { scale: 1, rotateY: 360 } : {}}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      <p className="text-base flex justify-end items-end leading-3 mt-5 text-center">
        Loading
        <Loading />
      </p>
    </div>
  );
};

export default Splash;
