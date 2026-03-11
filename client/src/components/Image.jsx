import { useState } from "react";
import { twMerge } from "tailwind-merge";

const DEFAULT_SRC = "/recipe.svg";

export const Image = ({ src, className }) => {
  const [resolvedSrc, setResolvedSrc] = useState(src || DEFAULT_SRC);
  return (
    <img
      src={resolvedSrc}
      onError={() => setResolvedSrc("/recipe.svg")}
      className={twMerge(
        "object-cover",
        resolvedSrc === DEFAULT_SRC && "object-contain",
        className,
      )}
    />
  );
};
