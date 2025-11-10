import React from "react";
import BlueLed from "./BlueLed.jsx";

function LedPanel({ active = -1, showBlue = true }) {
  const leds = [
    { bgClass: "bg-red-500" },
    { bgClass: "bg-yellow-400" },
    { bgClass: "bg-green-500" },
  ];

  return (
    <div className="flex flex-col items-center gap-4">
      {showBlue && <BlueLed />}
      <div className="flex gap-6 justify-center items-center">
        {leds.map((led, index) => {
          const isActive = index === active;
          return (
            <div
              key={index}
              className={[
                "w-20 h-20 rounded-full transition-all duration-300",
                led.bgClass,
                isActive ? "scale-110 opacity-100 shadow-lg" : "opacity-40",
              ].join(" ")}
            />
          );
        })}
      </div>
    </div>
  );
}

export default LedPanel;
