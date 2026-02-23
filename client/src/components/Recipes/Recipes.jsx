import React from "react";
import Recipe from "../Recipe/Recipe.jsx";
import useRecipes from "../../hooks/useRecipes.js";
import useDiets from "../../hooks/useDiets.js";
import RecipesFilters from "../RecipesFilters/RecipesFilters.jsx";
import Paginator from "../Paginator/Paginator.jsx";
import Loading from "../Loading/Loading.jsx";
import RecipesNotFound from "../RecipesNotFound/RecipesNotFound.jsx";
import { fetchStatus } from "../../utils/constants.js";

export default function Recipes() {
  const { displayedRecipes, recipesStatus, setRecipesFilters, fetchRecipes } =
    useRecipes();
  const { dietsStatus } = useDiets();

  if (
    recipesStatus === fetchStatus.LOADING ||
    dietsStatus === fetchStatus.LOADING
  ) {
    return <Loading />;
  }

  if (recipesStatus === fetchStatus.NOT_FOUND) {
    return (
      <Wrapper>
        <RecipesNotFound
          onReset={() => {
            fetchRecipes(null);
            setRecipesFilters([]);
          }}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <div className="flex justify-center flex-wrap gap-8">
        {displayedRecipes.map((recipe) => {
          return (
            <Recipe
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              diets={recipe.diets}
              score={recipe.score}
            />
          );
        })}
      </div>
    </Wrapper>
  );
}

function Wrapper({ children }) {
  return (
    <div className="flex flex-grow flex-col gap-8 p-8 h-full max-lg:p-4">
      <div className="pl-32 w-full max-lg:pl-0">
        <RecipesFilters />
      </div>

      {children}

      <div className="mt-auto flex justify-center">
        <Paginator />
      </div>
    </div>
  );
}
