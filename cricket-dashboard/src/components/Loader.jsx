// src/components/Loader.jsx
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <motion.div 
      className="flex justify-center items-center min-h-[50vh]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="w-12 h-12 border-4 border-blue-500 border-dotted rounded-full animate-spin"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1 }}
      ></motion.div>
    </motion.div>
  );
}
