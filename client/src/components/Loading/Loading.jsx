import React from "react";

export default function Loading() {
  return (
    <div className="h-[90.4vh] flex justify-center items-center bg-black">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`w-20 h-20 inline-block rounded-full bg-custom-white loading-dot loading-dot-${i}`}
        />
      ))}
    </div>
  );
}
