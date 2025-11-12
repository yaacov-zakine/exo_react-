import React from "react";
import Cell from "./Cell.jsx";
import { useMachineStore } from "../stores/useMachineStore.js";

function MachineTuring() {
  const { tape, headPosition, step, reset, numericChoice, setNumericChoice } = useMachineStore();
  const [input, setInput] = React.useState("");

  const saveAndReload = () => {
    setNumericChoice(input);
    window.location.reload();
  };

  return (
    <div className="machine">
      <h1>Machine de Turing</h1>

      <p>Position actuelle : {headPosition + 1}/{tape.length}</p>

      <div style={{ margin: "8px 0" }}>
        <label>
          Choix numérique :
          <input type="number" value={input} onChange={(e) => setInput(e.target.value)} style={{ marginLeft: 8 }} />
        </label>
        <button onClick={saveAndReload} style={{ marginLeft: 8 }}>
          Enregistrer & recharger
        </button>
        <div style={{ marginTop: 6 }}>
          Valeur enregistrée : <strong>{numericChoice}</strong>
        </div>
      </div>

      <div className="machine__tape">
        {tape.map((value, index) => (
          <Cell key={index} value={value} index={index} isHead={index === headPosition} />
        ))}
      </div>

      <div className="machine__controls">
        <button onClick={step}>Step</button>
        <button onClick={reset} style={{ marginLeft: 8 }}>Réinitialiser</button>
      </div>
    </div>
  );
}

export default MachineTuring;
