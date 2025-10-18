// src/components/ToastMessage.jsx
import { motion, AnimatePresence } from "framer-motion";

export default function ToastMessage({ message, type, isVisible }) {
  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-5 right-5 px-4 py-2 text-white rounded-md shadow-lg z-50 ${
            colors[type] || "bg-blue-500"
          }`}
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
