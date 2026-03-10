export const StarRating = ({ value, onChange }) => {
  return (
    <div className="flex h-8 items-center gap-3">
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => {
          const isFilled = star <= value;
          return (
            <button
              key={star}
              type="button"
              onMouseEnter={() => onChange(star)}
              className="text-2xl transition-all hover:scale-110 focus:outline-none"
            >
              <span className={isFilled ? "text-yellow-400" : "text-gray-600"}>
                ★
              </span>
            </button>
          );
        })}
      </div>
      <span className="text-custom-white/80 text-sm">({value}/5)</span>
    </div>
  );
};
