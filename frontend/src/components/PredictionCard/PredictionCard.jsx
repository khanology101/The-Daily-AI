import "./PredictionCard.css";
import { motion } from "framer-motion";
import {
  FaGlobe,
  FaFootballBall,
  FaBriefcase,
  FaMicrochip,
} from "react-icons/fa";

const CATEGORY_ICONS = {
  World: <FaGlobe />,
  Sports: <FaFootballBall />,
  Business: <FaBriefcase />,
  "Sci/Tech": <FaMicrochip />,
};

const CATEGORY_COLORS = {
  World: "#2D7FF9",
  Sports: "#2ECC71",
  Business: "#F39C12",
  "Sci/Tech": "#8E44AD",
};

export default function PredictionCard({ result }) {
  if (!result) return null;

  return (
    <motion.div
      className="predictionCard"
      initial={{ opacity: 0, scale: .8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: .5 }}
    >
      <div
        className="predictionTop"
        style={{
          background: CATEGORY_COLORS[result.label],
        }}
      >
        <div className="predictionIcon">
          {CATEGORY_ICONS[result.label]}
        </div>

        <h2>{result.label}</h2>

        <span>{result.confidence}% Confidence</span>
      </div>

      <div className="stamp">
        CLASSIFIED
      </div>
    </motion.div>
  );
}