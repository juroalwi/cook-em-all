export const Tag = ({ name, isOn, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={twMerge(
        "cursor-pointer rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide transition-all hover:opacity-90 lg:text-sm",
        isOn
          ? "border-custom-white bg-custom-white text-custom-red"
          : "text-custom-white/80 border-custom-white/40",
      )}
    >
      {name}
    </div>
  );
};
