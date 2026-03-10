import { useState } from "react";

export const Slider = ({ value, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <div className="flex h-8 items-center gap-3">
      <div
        className={twMerge(
          "flex h-full w-[128px] items-center",
          isDragging ? "cursor-grabbing" : "cursor-grab",
        )}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={(e) => {
          if (!isDragging) return;
          const rect = e.currentTarget.getBoundingClientRect();
          onChange(((e.nativeEvent.offsetX - 10) / (rect.width - 20)) * 100);
        }}
      >
        <div className="bg-custom-white/20 relative h-2 w-[120px] rounded-full">
          <div
            className="absolute h-full rounded-full bg-green-500"
            style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
          />
        </div>
      </div>

      <span className="text-custom-white/80 w-8 text-sm">{value}%</span>
    </div>
  );
};
