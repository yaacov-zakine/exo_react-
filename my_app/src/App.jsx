import "./App.css";
import React, { useReducer } from "react";
import LedPanel from "./LedPanel.jsx";
import { useEffect, useState } from "react";

const NUM_LEDS = 3;
const initialState = { active: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "NEXT": {
      const next = (state.active + 1) % NUM_LEDS;
      return { ...state, active: next };
    }
    case "PREV": {
      const prev = (state.active + NUM_LEDS - 1) % NUM_LEDS;
      return { ...state, active: prev };
    }
    case "RESET": {
      return { ...state, active: 0 };
    }
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showBlue, setShowBlue] = useState(true);
  const [changeCount, setChangeCount] = useState(0);

  // Count how many times the active LED changes
  useEffect(() => {
    setChangeCount((c) => c + 1);
  }, [state.active]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-100">
      <div className="space-y-8 items-center flex flex-col">
        {/* Zone compteur + bouton (visuel demandé) */}
        <div className="flex flex-col items-center gap-3">
          {!showBlue && (
            <div className="px-4 py-2 rounded-xl bg-blue-600 text-white text-2xl font-semibold leading-none">
              {changeCount}
            </div>
          )}
          <button
            onClick={() => setShowBlue((s) => !s)}
            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 font-medium"
          >
            {showBlue ? "Démontage" : "Remontage"}
          </button>
        </div>

        <LedPanel active={state.active} showBlue={showBlue} />

        <div className="flex gap-4 justify-center">
          <button
            onClick={() => dispatch({ type: "PREV" })}
            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 font-medium"
          >
            PREV
          </button>
          <button
            onClick={() => dispatch({ type: "RESET" })}
            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 font-medium"
          >
            RESET
          </button>
          <button
            onClick={() => dispatch({ type: "NEXT" })}
            className="px-6 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200 font-medium"
          >
            NEXT
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
