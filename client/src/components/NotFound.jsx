export const NotFound = ({
  icon = "🍽",
  title,
  description,
  primaryCta,
  secondaryCta,
}) => {
  return (
    <div className="light-shadow flex max-w-[420px] flex-col items-center gap-4 rounded-xs px-10 py-12 text-center">
      <div className="border-custom-white/20 text-custom-white flex h-18 w-18 items-center justify-center rounded-full border bg-black/40 text-[44px]">
        {icon}
      </div>

      <h2 className="text-custom-white text-xl font-normal tracking-wider">
        {title}
      </h2>

      <p className="text-custom-white/60 text-sm">{description}</p>

      <div className="mt-5 flex flex-wrap gap-3">
        {primaryCta && (
          <button
            onClick={primaryCta.onClick}
            className="bg-custom-red text-custom-white grow cursor-pointer rounded-xs px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80"
          >
            {primaryCta.text}
          </button>
        )}

        {secondaryCta && (
          <button
            onClick={secondaryCta.onClick}
            className="bg-custom-white text-custom-black grow cursor-pointer rounded-xs px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80"
          >
            {secondaryCta.text}
          </button>
        )}
      </div>
    </div>
  );
};
