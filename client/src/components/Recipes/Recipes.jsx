import React from "react";
import Recipe from "../Recipe/Recipe.jsx";
import * as S from "./Recipes.styled.js";
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
      <S.Recipes>
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
      </S.Recipes>
    </Wrapper>
  );
}

function Wrapper({ children }) {
  return (
    <S.Container>
      <S.Top>
        <RecipesFilters />
      </S.Top>

      {children}

      <S.Bottom>
        <Paginator />
      </S.Bottom>
    </S.Container>
  );
}
