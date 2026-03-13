import axios from "axios";
import {
  SET_DIETS,
  SET_DIETS_STATUS,
  SET_RECIPES,
  SET_RECIPES_FILTERS,
  SET_RECIPES_STATUS,
  SET_RECIPES_INDEX,
  SET_RECIPES_SORT_BY,
} from "./reducer";
import { fetchStatus } from "src/utils/constants";

export const fetchDiets = () => {
  return async (dispatch) => {
    dispatch({
      type: SET_DIETS_STATUS,
      payload: fetchStatus.LOADING,
    });
    try {
      const response = await axios.get(`/diets`);
      const diets = response.data;
      if (!diets.length) {
        dispatch({
          type: SET_DIETS_STATUS,
          payload: fetchStatus.NOT_FOUND,
        });
      } else {
        dispatch({
          type: SET_DIETS_STATUS,
          payload: fetchStatus.SUCCESS,
        });
      }
      dispatch({
        type: SET_DIETS,
        payload: diets,
      });
    } catch (error) {
      dispatch({
        type: SET_DIETS_STATUS,
        payload: fetchStatus.ERROR,
      });
      dispatch({
        type: SET_DIETS,
        payload: [],
      });
    }
  };
};

export const fetchRecipes = (query) => {
  return async (dispatch) => {
    dispatch({
      type: SET_RECIPES_STATUS,
      payload: fetchStatus.LOADING,
    });
    try {
      const safeQuery = typeof query !== "string" ? "" : query;
      const response = await axios.get(`/recipes?title=${safeQuery}`);
      const recipes = response.data;
      if (!recipes.length) {
        dispatch({
          type: SET_RECIPES_STATUS,
          payload: fetchStatus.NOT_FOUND,
        });
      } else {
        dispatch({
          type: SET_RECIPES_STATUS,
          payload: fetchStatus.SUCCESS,
        });
      }
      dispatch({
        type: SET_RECIPES,
        payload: recipes,
      });
    } catch (error) {
      dispatch({
        type: SET_RECIPES_STATUS,
        payload: fetchStatus.ERROR,
      });
      dispatch({
        type: SET_RECIPES,
        payload: [],
      });
    }
  };
};

export const setRecipesFilters = (filters) => {
  return {
    type: SET_RECIPES_FILTERS,
    payload: filters,
  };
};

export const setRecipesSortBy = (sortBy) => {
  return {
    type: SET_RECIPES_SORT_BY,
    payload: sortBy,
  };
};

export const setRecipesIndex = (index) => {
  return {
    type: SET_RECIPES_INDEX,
    payload: index,
  };
};
