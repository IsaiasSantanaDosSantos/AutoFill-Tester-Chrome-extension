import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Splash = () => {
  const [animation, setAnimation] = useState(false);

  useEffect(() => {
    setAnimation(true);
  }, []);

  return (
    <div className="size-full flex flex-col justify-items-center items-center">
      <h1 className="text-3xl mb-0 font-bold">AutoFill Tester</h1>
      <p className="text-xs mb-5 ">
        Preenchimento de formulários <br /> automático para teste.
      </p>
      <motion.img
        src="../../../public/icon128.png"
        alt="Icon app"
        className="size-30 m-auto items-end"
        initial={{ scale: 0, rotateY: 0 }}
        animate={animation ? { scale: 1, rotateY: 360 } : {}}
        transition={{ duration: 2, ease: "easeOut" }}
      />
      <p className="text-base flex justify-end items-center">
        Loading <span className="bg-white size-1 ml-2 rounded-full"></span>
        <span className="bg-white size-1 ml-2 rounded-full"></span>
        <span className="bg-white size-1 ml-2 rounded-full"></span>
      </p>
    </div>
  );
};

export default Splash;
