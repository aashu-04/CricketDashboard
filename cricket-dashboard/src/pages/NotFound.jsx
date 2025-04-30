// src/pages/NotFound.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[80vh] text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-6">Oops! Page not found.</p>
      <Link to="/" className="text-blue-600 underline">
        Go back to Home
      </Link>
    </motion.div>
  );
}
