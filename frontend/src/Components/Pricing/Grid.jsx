import React from "react";

export default function Grid() {
  const horizontalLines = 20;
  const verticalLines = 20;

  return (
    <div className="w-full h-[400px] overflow-hidden relative z-10">
      <div className="absolute inset-0 " style={{ perspective: "1000px" }}>
        <div
          className="absolute inset-0"
          style={{
            transform: "rotateX(60deg) scale(2.5)",
            transformOrigin: "center bottom",
          }}
        >
          {/* Horizontal lines */}
          {[...Array(horizontalLines)].map((_, index) => (
            <div
              key={`h-${index}`}
              className="absolute w-[200%] left-[-50%] border-t border-gray-200"
              style={{
                top: `${(index / horizontalLines) * 100}%`,
              }}
            />
          ))}
          {/* Vertical lines */}
          {[...Array(verticalLines)].map((_, index) => (
            <div
              key={`v-${index}`}
              className="absolute h-full border-l border-gray-200"
              style={{
                left: `${(index / verticalLines) * 100}%`,
                transform: `rotateY(${90 - (index / verticalLines) * 90}deg)`,
                transformOrigin: "top left",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
