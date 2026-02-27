import React from "react";
import { Link } from "react-router-dom";

export default function Recipe(props) {
  const getStarRating = (score) => {
    return (
      <div className="relative text-base">
        <span
          className="relative top-0.5 text-2xl bg-gradient-to-r bg-clip-text text-transparent"
          style={{
            backgroundImage: `linear-gradient(90deg, #FBBD0D ${score}%, #2D2C2E ${score}%)`,
          }}
        >
          ★★★★★
        </span>
      </div>
    );
  };

  return (
    <div className="relative w-full max-w-[400px] h-[500px] flex flex-col justify-between bg-custom-white max-[360px]:h-[440px]">
      <img
        src={props.image}
        alt="recipe"
        className="min-h-[300px] bg-cover max-[360px]:min-h-[240px]"
      />

      <div className="flex flex-col gap-2.5 p-4">
        <h1 className="text-custom-black text-2xl font-normal tracking-wider uppercase overflow-hidden text-ellipsis whitespace-nowrap">
          {props.title}
        </h1>
        <div className="flex items-center gap-2">
          {getStarRating(props.score)}
          <span className="text-base">({props.score})</span>
        </div>
        <ul className="flex flex-nowrap gap-1.5 overflow-x-scroll scrollbar-hide">
          {props.diets.map((diet, index) => {
            return (
              <li
                key={index}
                className="whitespace-nowrap py-0.5 px-2 w-auto flex text-base rounded-full bg-custom-black text-custom-white"
              >
                {diet}
              </li>
            );
          })}
        </ul>
      </div>

      <Link to={`/recipe/detail/${props.id}`}>
        <button className="h-[55px] w-full flex justify-center items-center bg-custom-red text-custom-white text-xl tracking-wider transition-colors duration-200 hover:bg-custom-yellow">
          DETAIL
        </button>
      </Link>
    </div>
  );
}
