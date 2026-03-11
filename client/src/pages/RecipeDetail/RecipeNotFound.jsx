import { useNavigate } from "react-router-dom";
import { NotFound } from "src/components/NotFound";

export const RecipeNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-4 my-8 lg:mx-8 lg:my-12">
      <div className="mx-auto w-fit">
        <NotFound
          title="Recipe not found"
          description="We couldn't find the recipe you're looking for. It may have been removed or the link might be incorrect."
          secondaryCta={{ text: "Go back", onClick: () => navigate(-1) }}
        />
      </div>
    </div>
  );
};
