import { useState } from "react";
import { twMerge } from "tailwind-merge";
import defaultRecipe from "src/media/images/default-recipe.svg";

export const RecipeImage = ({ src, className }) => {
  const [resolvedSrc, setResolvedSrc] = useState(src || defaultRecipe);
  return (
    <img
      src={resolvedSrc}
      onError={() => setResolvedSrc("/recipe.svg")}
      className={twMerge(
        "object-cover",
        resolvedSrc === defaultRecipe && "object-contain",
        className,
      )}
    />
  );
};
