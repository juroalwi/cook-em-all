/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Loading } from "src/components/Loading";

export const RecipeDetail = () => {
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
    (async () => {
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
      {loading ? (
        <Loading />
      ) : (
        <div className="m-[100px] bg-[url('../media/recipe-detail.jpg')] bg-[length:1100px_1650px] bg-[position:right_center] bg-no-repeat shadow-[0px_0px_8px_2px_rgba(155,155,155,0.8)]">
          <div className="bg-custom-white text-custom-black flex w-[820px] flex-col shadow-[inset_-10px_0px_8px_0px_rgba(0,0,0,0.6),10px_0px_8px_0px_rgba(0,0,0,0.4)]">
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
              <h1 className="mx-12 my-8 mb-6 text-left text-[32px] font-normal tracking-wider uppercase">
                {details.title}
              </h1>

              <div className="mb-[22px] flex">
                <div className="m-[15px_25px] text-2xl">
                  Score:{" "}
                  <span
                    className="bg-gradient-to-r bg-clip-text pl-[5px] text-2xl text-transparent"
                    style={{
                      backgroundImage: `linear-gradient(90deg, #FBBD0D ${details.score * 20}%, #111 ${details.score * 20}%)`,
                    }}
                  >
                    ★★★★★
                  </span>
                </div>
                <i className="text-custom-black m-[15px_20px] p-0.5 text-[22px] opacity-60">
                  Health score: {details.healthScore}%
                </i>
              </div>

              <ul className="mx-[15px] mb-8 flex flex-wrap">
                {details.diets.map((diet, index) => {
                  return (
                    <li
                      key={index}
                      className="bg-custom-black text-custom-white m-[5px] flex-shrink-0 rounded-full px-3 py-0.5 text-lg"
                    >
                      {diet}
                    </li>
                  );
                })}
              </ul>

              <h1 className="mx-5 my-2.5 text-2xl">Summary:</h1>
              <div className="custom-scrollbar-dark my-[15px] mr-10 ml-[15px] max-h-[250px] overflow-y-scroll bg-[#eae5d6] p-[10px_10px_10px_34px] text-lg">
                {details.summary}
              </div>

              <h1 className="mx-5 my-2.5 text-2xl">Instructions:</h1>
              <div className="custom-scrollbar-dark my-[15px] mr-10 ml-[15px] max-h-[250px] overflow-y-scroll bg-[#eae5d6] p-[10px_10px_10px_34px] text-lg">
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
      )}
    </>
  );
};
