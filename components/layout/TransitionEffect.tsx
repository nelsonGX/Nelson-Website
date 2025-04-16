import { motion } from "framer-motion";
import { useWindowDimensions } from "@/components/hooks";

export default function TransitionEffect() {
  const { isSmallScreen } = useWindowDimensions();
  
  // Mobile
  if (isSmallScreen) {
    return (
      <>
        <motion.div
          className="fixed top-0 bottom-0 right-full w-screen h-screen z-50 bg-zinc-900"
          initial={{ x: "100%", width: "100%" }}
          animate={{ x: "0%", width: "0%" }}
          exit={{ x: ["0%", "100%"], width: ["0%", "100%"] }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        />
        <motion.div
          className="fixed top-0 bottom-0 right-full w-screen h-screen z-40 bg-zinc-400"
          initial={{ x: "100%", width: "100%" }}
          animate={{ x: "0%", width: "0%" }}
          transition={{ delay: 0.1, duration: 0.2, ease: "easeInOut" }}
        />
        <motion.div
          className="fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-gray-800"
          initial={{ x: "100%", width: "100%" }}
          animate={{ x: "0%", width: "0%" }}
          transition={{ delay: 0.2, duration: 0.2, ease: "easeInOut" }}
        />
      </>
    );
  }
  
  // Desktop
  return (
    <>
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-50 bg-zinc-900"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        exit={{ x: ["0%", "100%"], width: ["0%", "100%"] }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-40 bg-zinc-400"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ delay: 0.2, duration: 0.8, ease: "easeInOut" }}
      />
      <motion.div
        className="fixed top-0 bottom-0 right-full w-screen h-screen z-30 bg-gray-800"
        initial={{ x: "100%", width: "100%" }}
        animate={{ x: "0%", width: "0%" }}
        transition={{ delay: 0.4, duration: 0.8, ease: "easeInOut" }}
      />
    </>
  );
}