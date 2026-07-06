import "./InputSection.css";
import { FaPenNib, FaPaperPlane } from "react-icons/fa";
import { motion } from "framer-motion";

export default function InputSection({
  text,
  setText,
  classify,
  loading,
}) {
  return (
    <motion.div
      className="inputContainer"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="inputHeader">
        <FaPenNib />
        <span>Editor's Desk</span>
      </div>

      <textarea
        rows={8}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste today's breaking news here..."
      />

      <motion.button
        whileHover={{
          scale: 1.05,
        }}
        whileTap={{
          scale: 0.95,
        }}
        onClick={classify}
        disabled={loading || !text.trim()}
      >
        <FaPaperPlane />

        {loading
          ? " Printing Tomorrow's Edition..."
          : " Classify Article"}
      </motion.button>
    </motion.div>
  );
}