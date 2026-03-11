import { twMerge } from "tailwind-merge";

export const Tag = ({ name, isOn, isStatic, onClick }) => {
  return (
    <div
      onClick={isStatic ? undefined : onClick}
      className={twMerge(
        "bg-custom-black rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide transition-all lg:text-sm",
        isStatic ? "" : "cursor-pointer hover:opacity-90",
        isOn
          ? "border-custom-white bg-custom-white text-custom-red"
          : "text-custom-white/80 border-custom-white/40",
      )}
    >
      {name}
    </div>
  );
};
