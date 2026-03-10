import React from "react";
import { Link } from "react-router-dom";

export const Recipe = (props) => {
  const getStarRating = (score) => {
    return (
      <div className="relative text-base">
        <span
          className="relative top-0.5 bg-gradient-to-r bg-clip-text text-2xl text-transparent"
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
    <div className="bg-custom-white relative flex h-[500px] w-full max-w-[400px] flex-col justify-between overflow-hidden rounded-sm max-[360px]:h-[440px]">
      <img
        src={props.image}
        alt="recipe"
        className="min-h-[300px] bg-cover max-[360px]:min-h-[240px]"
      />

      <div className="flex flex-col gap-2.5 p-4">
        <h1 className="text-custom-black overflow-hidden text-2xl font-normal tracking-wider text-ellipsis whitespace-nowrap uppercase">
          {props.title}
        </h1>
        <div className="flex items-center gap-2">
          {getStarRating(props.score)}
          <span className="text-base">({props.score})</span>
        </div>
        <ul className="no-scrollbar flex flex-nowrap gap-1.5 overflow-x-scroll">
          {props.diets.map((diet, index) => {
            return (
              <li
                key={index}
                className="bg-custom-black text-custom-white flex w-auto rounded-full px-2 py-0.5 text-base whitespace-nowrap"
              >
                {diet}
              </li>
            );
          })}
        </ul>
      </div>

      <Link to={`/recipe/detail/${props.id}`}>
        <button className="bg-custom-red text-custom-white hover:bg-custom-yellow flex h-[55px] w-full cursor-pointer items-center justify-center text-xl tracking-wider uppercase transition-colors duration-200">
          detail
        </button>
      </Link>
    </div>
  );
};
