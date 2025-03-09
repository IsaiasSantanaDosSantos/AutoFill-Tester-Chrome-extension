import { motion } from "framer-motion";

const Loading = () => {
  return (
    <>
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
    </>
  );
};

export default Loading;
