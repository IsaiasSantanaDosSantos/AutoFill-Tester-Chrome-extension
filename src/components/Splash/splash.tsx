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
      <p className="text-base flex justify-end items-end leading-3 mt-5">
        Loading
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="bg-white size-1 ml-1 rounded-full"
            animate={{
              y: [0, -3, 0],
              opacity: [1, 0.3, 1],
            }}
            transition={{
              duration: 0.6,
              ease: "easeInOut",
              repeat: Infinity,
              repeatDelay: 0.2,
              delay: i * 0.2,
            }}
          />
        ))}
      </p>
    </div>
  );
};

export default Splash;
