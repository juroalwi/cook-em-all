import { Link } from "react-router-dom";
import { RecipeImage } from "src/components/RecipeImage";
import { StarRating } from "src/components/StarRating";
import { Tag } from "src/components/Tag";

export const RecipeCard = (props) => {
  return (
    <div className="bg-custom-white relative flex h-100 w-full max-w-80 flex-col justify-between overflow-hidden rounded-t-xs rounded-b-3xl lg:h-125 lg:max-w-100">
      <RecipeImage src={props.image} className="h-60 bg-cover lg:min-h-75" />

      <div className="flex flex-col gap-1 p-2 lg:gap-2.5 lg:p-4">
        <h1 className="text-custom-black overflow-hidden text-xl font-normal tracking-wider text-ellipsis whitespace-nowrap uppercase lg:text-2xl">
          {props.title}
        </h1>
        <StarRating
          value={props.score / 20}
          isStatic
          className="text-inherit"
        />
        <ul className="no-scrollbar flex flex-nowrap gap-1.5 overflow-x-scroll">
          {props.diets.map((diet) => {
            return (
              <li key={diet} className="whitespace-nowrap">
                <Tag name={diet} isStatic />
              </li>
            );
          })}
        </ul>
      </div>

      <Link to={`/recipe/detail/${props.id}`}>
        <button className="bg-custom-red border-custom-black text-custom-white hover:bg-custom-yellow flex h-12 w-full cursor-pointer items-center justify-center border-t-4 text-xl tracking-wider uppercase transition-colors duration-200 lg:h-14">
          detail
        </button>
      </Link>
    </div>
  );
};
