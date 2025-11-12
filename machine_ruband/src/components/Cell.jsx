import React from "react";

function Cell({ value, index, isHead }) {
  return (
    <div className={["cell", isHead ? "cell--active" : ""].join(" ")}>
      <span className="cell__index">{index}</span>
      <span className="cell__value">{value}</span>
    </div>
  );
}

export default Cell;