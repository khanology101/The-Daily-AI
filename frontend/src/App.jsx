import { useState } from "react";
import axios from "axios";

import Background from "./components/Background/Background";
import Header from "./components/Header/Header";
import Ticker from "./components/Ticker/Ticker";
import InputSection from "./components/InputSection/InputSection";
import PredictionCard from "./components/PredictionCard/PredictionCard";
import ScoreBars from "./components/ScoreBars/ScoreBars";

export default function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const classify = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await axios.post(
        "http://localhost:8000/classify",
        { text }
      );

      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("Could not reach the backend.");
    }

    setLoading(false);
  };

  return (
    <>
    <Background />
      <Ticker />

      <Header />

      <InputSection
        text={text}
        setText={setText}
        classify={classify}
        loading={loading}
      />

      {error && (
        <p
          style={{
            color: "crimson",
            textAlign: "center",
            marginTop: "20px",
            fontWeight: "bold",
          }}
        >
          {error}
        </p>
      )}

      <PredictionCard result={result} />

      <ScoreBars scores={result?.all_scores} />
    </>
  );
}