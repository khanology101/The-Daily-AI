import "./Header.css";
import { FaNewspaper } from "react-icons/fa";

export default function Header() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="header">

      <div className="edition">
        <span>Edition No. 001</span>
        <span>{today}</span>
      </div>

      <h1>
        <FaNewspaper className="logoIcon" />
        THE DAILY AI
      </h1>

      <p>
        AI-Powered News Intelligence
      </p>

    </header>
  );
}