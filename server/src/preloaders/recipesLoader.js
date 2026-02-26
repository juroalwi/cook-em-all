import { Op } from "@sequelize/core";
import { recipeModel, dietModel } from "../db.js";
import { recipesData } from "./recipesData.js";

export const recipesLoader = () => {
  return recipesData.map(async (recipe) => {
    const {
      id,
      title,
      image,
      diets = [],
      summary,
      score,
      healthScore,
      instructions = [],
    } = recipe;

    try {
      const newRecipePromise = recipeModel.create({
        id,
        title,
        image,
        summary: summary.replace(/<[^>]*>?/g, ""),
        score: Number(score),
        health_score: Number(healthScore),
        instructions,
      });

      const matchedDietsPromise = dietModel.findAll({
        where: {
          name: {
            [Op.in]: diets,
          },
        },
      });

      const [newRecipe, matchedDiets] = await Promise.all([
        newRecipePromise,
        matchedDietsPromise,
      ]);

      newRecipe.setDiets(matchedDiets);
    } catch (error) {
      console.error(`Failed to preload recipes: ${error}`);
      throw error;
    }
  });
};
