import express from "express";
import { getRecipes } from "./getRecipes.js";
import { getRecipeDetail } from "./getRecipeDetail.js";
import { postRecipe } from "./postRecipe.js";

const recipesRouter = express.Router();

recipesRouter.get("/", getRecipes);
recipesRouter.get("/detail/:id", getRecipeDetail);
recipesRouter.post("/create", postRecipe);

export { recipesRouter };
