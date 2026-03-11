/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useScreenSize } from "src/hooks/useScreenSize";
import { Image } from "src/components/Image";
import { Loading } from "src/components/Loading";
import { StarRating } from "src/components/StarRating";
import { Tag } from "src/components/Tag";
import { RecipeNotFound } from "./RecipeNotFound";

export const RecipeDetail = () => {
  const { id } = useParams();
  const { isMobile } = useScreenSize();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
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
        setIsLoading(true);
        const response = await axios.get(`/recipes/detail/${id}`);
        setDetails({
          ...details,
          ...response.data,
        });
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !details.title) {
    return <RecipeNotFound />;
  }

  if (isMobile) {
    return (
      <div className="bg-custom-white mx-4 my-8 overflow-hidden rounded-xs">
        <Content details={details} />
      </div>
    );
  }

  return (
    <div className="mx-8 my-12">
      <div className="mx-auto flex max-w-300 overflow-hidden rounded-xs">
        <div
          className="bg-custom-white grow pr-8"
          style={{
            zIndex: 10,
            boxShadow: `
            inset -10px 0px 8px 0px rgba(0,0,0,0.6),
            10px 0px 8px 0px rgba(0,0,0,0.4)
          `,
          }}
        >
          <Content details={details} />
        </div>

        <div
          style={{
            backgroundImage: "url(/recipe-detail.jpg)",
            backgroundPosition: "right center",
            backgroundSize: "cover",
          }}
          className="hidden w-1/2 shrink-0 lg:flex"
        />
      </div>
    </div>
  );
};

const Content = ({ details }) => {
  return (
    <div className="flex grow flex-col p-4">
      <Image src={details.image} className="h-80 lg:h-100" />

      <div className="flex flex-col gap-3 px-4 pt-4 lg:gap-5">
        <h1 className="line-clamp-3 text-lg font-medium tracking-wide uppercase lg:text-2xl">
          {details.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2 lg:gap-4">
          <StarRating
            value={details.score / 20}
            isStatic
            className="text-custom-black"
          />
          <i className="text-custom-black/60 text-sm whitespace-nowrap lg:text-lg">
            Health score: {details.healthScore}%
          </i>
        </div>

        <ul className="flex flex-wrap gap-2">
          {details.diets.map((diet) => (
            <Tag key={diet} name={diet} isStatic />
          ))}
        </ul>

        {details.summary && (
          <div className="flex flex-col gap-1">
            <h1 className="text-base font-medium tracking-wide uppercase lg:text-lg">
              summary
            </h1>
            <div className="custom-scrollbar-dark bg-custom-black/4 max-h-60 overflow-y-scroll px-4 py-2 text-sm">
              {details.summary}
            </div>
          </div>
        )}

        {details.instructions && details.instructions.length > 0 && (
          <div className="flex flex-col gap-1">
            <h1 className="text-base font-medium tracking-wide uppercase lg:text-lg">
              instructions
            </h1>
            <div className="custom-scrollbar-dark bg-custom-black/4 max-h-60 overflow-y-scroll px-4 py-2 text-sm">
              <ol>
                {details.instructions.map((instruction, index) => {
                  return (
                    <li key={`instruction-${index}`}>
                      {index + 1}. {instruction}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
