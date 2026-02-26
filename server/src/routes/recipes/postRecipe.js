import { Op } from "@sequelize/core";
import { recipeModel, dietModel } from "../../db.js";

export const postRecipe = async (req, res, next) => {
  const {
    title,
    diets = [],
    summary,
    score,
    healthScore,
    instructions = [],
  } = req.body;

  if (
    !title ||
    Number.isNaN(Number(score)) ||
    Number.isNaN(Number(healthScore)) ||
    !Array.isArray(diets) ||
    !Array.isArray(instructions)
  ) {
    return res.status(400).send("Invalid values provided.");
  }

  try {
    const newRecipePromise = recipeModel.create({
      title,
      summary,
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

    res.send({ id: newRecipe.dataValues.id });
  } catch (error) {
    next(error);
  }
};
