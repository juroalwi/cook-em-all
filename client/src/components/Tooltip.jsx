export const Tooltip = ({ text, children }) => {
  return (
    <div className="group relative w-fit">
      {children}

      <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 -translate-x-1/2 rounded bg-black px-2 py-1 text-xs whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
        {text}
      </div>
    </div>
  );
};
