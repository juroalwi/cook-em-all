import { useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  RECIPES_PER_PAGE_DESKTOP,
  RECIPES_PER_PAGE_MOBILE,
} from "src/utils/constants";
import {
  fetchRecipes as fetchRecipesAction,
  setRecipesSortBy as setRecipesSortByAction,
  setRecipesFilters as setRecipesFiltersAction,
  setRecipesIndex as setREcipesIndexAction,
} from "src/redux/actions";
import { useScreenSize } from "./useScreenSize";

export const useRecipes = () => {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const recipesStatus = useSelector((state) => state.recipesStatus);
  const recipesIndex = useSelector((state) => state.recipesIndex);
  const recipesFilters = useSelector((state) => state.recipesFilters);
  const recipesSortBy = useSelector((state) => state.recipesSortBy);
  const { isMobile } = useScreenSize();

  const recipesPerPage = isMobile
    ? RECIPES_PER_PAGE_MOBILE
    : RECIPES_PER_PAGE_DESKTOP;

  const fetchRecipes = useCallback((query) => {
    dispatch(fetchRecipesAction(query));
  }, []);

  const setRecipesSortBy = useCallback((sortBy) => {
    dispatch(setRecipesSortByAction(sortBy));
  }, []);

  const setRecipesFilters = useCallback((filters) => {
    dispatch(setRecipesFiltersAction(filters));
  }, []);

  const setRecipesPage = useCallback((pageNumber) => {
    const newIndex = (pageNumber - 1) * recipesPerPage;
    dispatch(setREcipesIndexAction(newIndex));
  }, []);

  const sortedRecipes = useMemo(() => {
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
  }, [recipes, recipesSortBy]);

  const filteredRecipes = useMemo(() => {
    return sortedRecipes.filter((recipe) =>
      recipesFilters.every((filter) => recipe.diets.includes(filter)),
    );
  }, [sortedRecipes, recipesFilters]);

  const paginatedRecipes = useMemo(() => {
    return filteredRecipes.slice(recipesIndex, recipesIndex + recipesPerPage);
  }, [filteredRecipes, recipesIndex, recipesPerPage]);

  return {
    displayedRecipes: paginatedRecipes,
    fetchRecipes,
    setRecipesSortBy,
    setRecipesFilters,
    setRecipesPage,
    recipesStatus,
    recipesSortBy,
    recipesFilters,
    recipesPage: Math.floor(recipesIndex / recipesPerPage) + 1,
    recipesMaxPage: Math.ceil(filteredRecipes.length / recipesPerPage),
  };
};
