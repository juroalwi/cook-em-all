/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../Loading/Loading.jsx";

export default function RecipeDetail() {
  const defaultRecipesNumber = 100;
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState({
    title: "",
    image: "",
    diets: [],
    summary: "",
    score: "",
    healthScore: "",
    instructions: [],
  });

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`/recipes/detail/${id}`);
        setDetails({
          ...details,
          ...response.data,
        });
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      {" "}
      {loading ? (
        <Loading />
      ) : (
        <div className="m-[100px] shadow-[0px_0px_8px_2px_rgba(155,155,155,0.8)] bg-[url('../media/recipe-detail.jpg')] bg-no-repeat bg-[length:1100px_1650px] bg-[position:right_center]">
          <div className="w-[820px] flex flex-col shadow-[inset_-10px_0px_8px_0px_rgba(0,0,0,0.6),10px_0px_8px_0px_rgba(0,0,0,0.4)] bg-custom-white text-custom-black">
            {/* Border property is defined in order to avoid showing a border around */
            /* the recipe's image when the recipe is an user created one (user created images */
            /* are svg images with no background). */}
            <img
              src={details.image}
              alt="recipe"
              className={`my-3 mr-10 ml-3 h-[560px] bg-cover ${
                !(details.id >= defaultRecipesNumber)
                  ? "border border-black"
                  : "border-none"
              }`}
            />

            <div className="flex flex-col justify-start">
              <h1 className="my-8 mx-12 mb-6 text-left text-[32px] font-normal tracking-wider uppercase">
                {details.title}
              </h1>

              <div className="flex mb-[22px]">
                <div className="m-[15px_25px] text-2xl">
                  Score:{" "}
                  <span
                    className="pl-[5px] text-2xl bg-gradient-to-r bg-clip-text text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(90deg, #FBBD0D ${details.score * 20}%, #111 ${details.score * 20}%)`,
                    }}
                  >
                    ★★★★★
                  </span>
                </div>
                <i className="m-[15px_20px] p-0.5 opacity-60 text-custom-black text-[22px]">
                  Health score: {details.healthScore}%
                </i>
              </div>

              <ul className="mx-[15px] mb-8 flex flex-wrap">
                {details.diets.map((diet, index) => {
                  return (
                    <li
                      key={index}
                      className="flex-shrink-0 m-[5px] py-0.5 px-3 rounded-full bg-custom-black text-custom-white text-lg"
                    >
                      {diet}
                    </li>
                  );
                })}
              </ul>

              <h1 className="my-2.5 mx-5 text-2xl">Summary:</h1>
              <div className="my-[15px] mr-10 ml-[15px] p-[10px_10px_10px_34px] max-h-[250px] bg-[#eae5d6] text-lg overflow-y-scroll custom-scrollbar-dark">
                {details.summary}
              </div>

              <h1 className="my-2.5 mx-5 text-2xl">Instructions:</h1>
              <div className="my-[15px] mr-10 ml-[15px] p-[10px_10px_10px_34px] max-h-[250px] bg-[#eae5d6] text-lg overflow-y-scroll custom-scrollbar-dark">
                <ol>
                  {details.instructions.map((instruction, index) => {
                    return (
                      <li key={index} className="list-decimal">
                        {" "}
                        {instruction}{" "}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      )}{" "}
    </>
  );
}
