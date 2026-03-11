import { NotFound } from "src/components/NotFound";
import { useNavigate } from "react-router-dom";

export const RecipesNotFound = ({ onReset }) => {
  const navigate = useNavigate();
  return (
    <div className="mx-4 my-8 lg:mx-8 lg:my-12">
      <div className="mx-auto w-fit">
        <NotFound
          title="No recipes found"
          description="We couldn't find any recipes matching your search or filters. Try adjusting them or create a new recipe."
          secondaryCta={{ text: "Reset filters", onClick: onReset }}
          primaryCta={{
            text: "Create recipe",
            onClick: () => navigate("/recipe/create"),
          }}
        />
      </div>
    </div>
  );
};
