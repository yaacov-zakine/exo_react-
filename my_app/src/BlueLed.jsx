import React, { useEffect } from "react";

function BlueLed() {
  useEffect(() => {
    // Demonstrate mount/unmount lifecycle
    // This effect runs when the blue LED is mounted and cleans up on unmount
    console.log("Blue LED mounted");
    return () => {
      console.log("Blue LED unmounted");
    };
  }, []);

  return <div className="w-10 h-10 rounded-full bg-blue-500 shadow-lg" />;
}

export default BlueLed;
