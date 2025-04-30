// src/pages/Home.jsx
import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[80vh] text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-5xl font-bold text-blue-700 mb-6">
        Welcome to Wicket Pulse 🏏
      </h1>
      <p className="text-xl text-gray-700 mb-8">
        Your ultimate destination for live cricket matches, stats, and analytics.
      </p>
      <motion.img 
        src="/logo.svg" 
        alt="WicketPulse Logo" 
        className="w-32 h-32"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
    </motion.div>
  );
}
