import "./ScoreBars.css";

const CATEGORY_COLORS = {
  World: "#2D7FF9",
  Sports: "#2ECC71",
  Business: "#F39C12",
  "Sci/Tech": "#8E44AD",
};

export default function ScoreBars({ scores }) {

  if (!scores) return null;

  return (

    <div className="scoreContainer">

      <h2>Category Breakdown</h2>

      {Object.entries(scores).map(([label, score]) => (

        <div className="scoreRow" key={label}>

          <div className="labels">

            <span>{label}</span>

            <span>{score}%</span>

          </div>

          <div className="track">

            <div
              className="fill"
              style={{
                width:`${score}%`,
                background:CATEGORY_COLORS[label]
              }}
            />

          </div>

        </div>

      ))}

    </div>

  );

}