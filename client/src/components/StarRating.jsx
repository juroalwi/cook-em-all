import { twMerge } from "tailwind-merge";

export const StarRating = ({ value, onChange, isStatic, className }) => {
  return (
    <div
      className={twMerge(
        "text-custom-white/80 flex h-8 items-center gap-2",
        className,
      )}
    >
      <div className="flex items-center gap-1">
        {[0, 1, 2, 3, 4].map((star) => {
          const fill = Math.min(Math.max(value - star, 0), 1);

          return (
            <button
              key={`star-${star}`}
              type="button"
              onMouseMove={
                isStatic
                  ? undefined
                  : (e) => {
                      const { left, width } =
                        e.currentTarget.getBoundingClientRect();
                      const d = e.clientX - left;
                      const fillUpdated = Math.min(Math.max(d / width, 0), 1);
                      onChange?.(parseFloat((star + fillUpdated).toFixed(1)));
                    }
              }
              className={twMerge(
                "relative text-lg transition-all focus:outline-none lg:text-2xl",
                isStatic ? "" : "hover:scale-110",
              )}
            >
              <span className="text-gray-600">★</span>

              <span
                className="absolute top-0 left-0 overflow-hidden text-amber-400"
                style={{ width: `${fill * 100}%` }}
              >
                ★
              </span>
            </button>
          );
        })}
      </div>

      <span className="w-10 text-sm whitespace-nowrap">
        {Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1)} / 5
      </span>
    </div>
  );
};
