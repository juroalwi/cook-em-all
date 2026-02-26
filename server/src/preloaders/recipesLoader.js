import { Op } from "@sequelize/core";
import { recipeModel, dietModel } from "../db.js";
import { recipesData } from "./recipesData.js";

export const recipesLoader = () => {
  return recipesData.map(async (recipe) => {
    const {
      title,
      image,
      diets = [],
      summary,
      score,
      healthScore,
      instructions = [],
    } = recipe;
    return new Promise(async (resolve, reject) => {
      try {
        const newRecipePromise = db.models.Recipe.create({
          title,
          image,
          summary: summary.replace(/<[^>]*>?/g, ""),
          score: Number(score),
          healthScore: Number(healthScore),
          instructions,
        });

        const matchedDietsPromise = db.models.Diet.findAll({
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

        resolve([newRecipe, matchedDiets]);
      } catch (error) {
        reject(error);
      }
    });
  });
};
