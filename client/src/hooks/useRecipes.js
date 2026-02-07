import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RECIPES_PER_PAGE_DESKTOP,
  RECIPES_PER_PAGE_MOBILE,
} from "../utils/constants";
import {
  fetchRecipes as fetchRecipesAction,
  setRecipesSortBy as setRecipesSortByAction,
  setRecipesFilters as setRecipesFiltersAction,
  setRecipesIndex as setREcipesIndexAction,
} from "../redux/actions";
import useScreenSize from "./useScreenSize";

export default function useRecipes() {
  const dispatch = useDispatch();
  const { isMobile } = useScreenSize();
  const recipes = useSelector((state) => state.recipes);
  const recipesLoading = useSelector((state) => state.recipesLoading);
  const recipesIndex = useSelector((state) => state.recipesIndex);
  const recipesFilters = useSelector((state) => state.recipesFilters);
  const recipesSortBy = useSelector((state) => state.recipesSortBy);

  const recipesPerPage = isMobile
    ? RECIPES_PER_PAGE_MOBILE
    : RECIPES_PER_PAGE_DESKTOP;

  const fetchRecipes = useCallback(function (query) {
    dispatch(fetchRecipesAction(query));
  }, []);

  const setRecipesSortBy = useCallback(function (sortBy) {
    dispatch(setRecipesSortByAction(sortBy));
  }, []);

  const setRecipesFilters = useCallback(function (filters) {
    dispatch(setRecipesFiltersAction(filters));
  }, []);

  const setRecipesPage = useCallback(function (pageNumber) {
    const newIndex = (pageNumber - 1) * recipesPerPage;
    dispatch(setREcipesIndexAction(newIndex));
  }, []);

  const sortedRecipes = useMemo(
    function () {
      switch (recipesSortBy) {
        case "az":
          return [...recipes].sort((x, y) => x.title.localeCompare(y.title));
        case "za":
          return [...recipes].sort((x, y) => y.title.localeCompare(x.title));
        case "score":
          return [...recipes].sort((x, y) => y.score - x.score);
        default:
          return [...recipes];
      }
    },
    [recipes, recipesSortBy],
  );

  const filteredRecipes = useMemo(
    function () {
      return sortedRecipes.filter((recipe) =>
        recipesFilters.every((filter) => recipe.diets.includes(filter)),
      );
    },
    [sortedRecipes, recipesFilters],
  );

  const paginatedRecipes = useMemo(
    function () {
      return filteredRecipes.slice(recipesIndex, recipesIndex + recipesPerPage);
    },
    [filteredRecipes, recipesIndex, recipesPerPage],
  );

  return {
    displayedRecipes: paginatedRecipes,
    fetchRecipes,
    setRecipesSortBy,
    setRecipesFilters,
    setRecipesPage,
    recipesLoading,
    recipesSortBy,
    recipesFilters,
    recipesPage: Math.floor(recipesIndex / recipesPerPage) + 1,
    recipesMaxPage: Math.ceil(filteredRecipes.length / recipesPerPage),
  };
}
