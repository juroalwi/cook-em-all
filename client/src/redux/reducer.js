import { fetchStatus } from "../utils/constants";

export const SET_DIETS = "SET_DIETS";
export const SET_DIETS_STATUS = "SET_DIETS_STATUS";
export const SET_RECIPES = "SET_RECIPES";
export const SET_RECIPES_STATUS = "SET_RECIPES_STATUS";
export const SET_RECIPES_FILTERS = "SET_RECIPES_FILTERS";
export const SET_RECIPES_SORT_BY = "SET_RECIPES_SORT_BY";
export const SET_RECIPES_INDEX = "SET_RECIPES_INDEX";

const initialState = {
  diets: [],
  dietsStatus: fetchStatus.IDLE,
  recipes: [],
  recipesStatus: fetchStatus.IDLE,
  recipesIndex: 0,
  recipesFilters: [],
  recipesSortBy: null,
};

export default function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_DIETS:
      return {
        ...state,
        diets: payload,
      };
    case SET_DIETS_STATUS:
      return {
        ...state,
        dietsStatus: payload,
      };
    case SET_RECIPES:
      return {
        ...state,
        recipes: payload,
        recipesIndex: 0,
        recipesFilters: [],
        recipesSortBy: null,
      };
    case SET_RECIPES_STATUS:
      return {
        ...state,
        recipesStatus: payload,
      };
    case SET_RECIPES_FILTERS:
      return {
        ...state,
        recipesFilters: payload,
        recipesIndex: 0,
      };
    case SET_RECIPES_SORT_BY:
      return {
        ...state,
        recipesSortBy: payload,
        recipesIndex: 0,
      };

    case SET_RECIPES_INDEX:
      if (payload < 0 || payload > state.recipes.length - 1) {
        console.error("Invalid recipes Index provided");
        return {
          ...state,
          recipesIndex: 0,
        };
      }
      return {
        ...state,
        recipesIndex: payload,
      };

    default:
      return {
        ...state,
      };
  }
}
