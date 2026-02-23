import { Link } from "react-router-dom";

export default function RecipesNotFound({ onReset }) {
  return (
    <div className="max-w-[420px] p-12 px-10 mt-20 mx-auto flex flex-col items-center text-center gap-[18px] bg-custom-white/[0.06] border border-custom-white/[0.1] rounded-md">
      <div className="w-18 h-18 rounded-full border border-custom-white/[0.2] bg-black/40 text-[44px] leading-[1.6] text-custom-white flex items-center justify-center">
        🍽
      </div>

      <h2 className="text-xl font-normal tracking-wider text-custom-white">
        No recipes found
      </h2>

      <p className="text-sm leading-[1.6] text-custom-white/[0.63]">
        We couldn't find any recipes matching your search or filters. Try
        adjusting them or create a new recipe.
      </p>

      <div className="flex gap-3 mt-2.5">
        {onReset && (
          <button
            onClick={onReset}
            className="py-2.5 px-[18px] bg-custom-black border border-custom-white/[0.2] rounded text-sm text-custom-white transition-opacity duration-200 hover:opacity-80"
          >
            Reset filters
          </button>
        )}

        <Link
          to="/recipe/create"
          className="py-2.5 px-[18px] bg-custom-red rounded text-sm text-white transition-opacity duration-200 hover:opacity-80"
        >
          Create recipe
        </Link>
      </div>
    </div>
  );
}
