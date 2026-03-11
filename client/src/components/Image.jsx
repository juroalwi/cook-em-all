import { useState } from "react";
import { twMerge } from "tailwind-merge";

export const Image = ({ src, className }) => {
  const [imgSrc, setImgSrc] = useState(src || "/recipe.svg");
  return (
    <img
      src={imgSrc}
      onError={() => setImgSrc("/recipe.svg")}
      className={twMerge("object-cover", className)}
    />
  );
};
