import axios from "axios";
import { recipeModel, dietModel } from "../../db.js";

export const getRecipeDetail = async (req, res, next) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send("Invalid recipe ID provided.");
  }

  try {
    const internalRecipe = await getInternalRecipe(id);

    if (internalRecipe) {
      return res.status(200).send(internalRecipe);
    }

    const externalRecipe = await getExternalRecipe(id);

    if (externalRecipe) {
      return res.status(200).send(externalRecipe);
    }

    return res.status(404).send("Recipe not found");
  } catch (error) {
    console.error(`Failed to get recipe detail ${id}: ${error}`);
    next(error);
  }
};

const getInternalRecipe = async (id) => {
  try {
    const response = await recipeModel.findByPk(id, {
      include: {
        model: dietModel,
        as: "diets",
        attributes: ["name"],
        through: { attributes: [] },
      },
    });

    if (!response || !response.dataValues) {
      return null;
    }

    return {
      id: response.dataValues.id,
      title: response.dataValues.title,
      image: response.dataValues.image,
      score: response.dataValues.score,
      healthScore: response.dataValues.health_score,
      summary: response.dataValues.summary,
      diets: response.dataValues.diets.map((diet) => diet.name),
      instructions: response.dataValues.instructions,
    };
  } catch (error) {
    console.error(`Failed to get internal recipe detail ${id}: ${error}`);
    return null;
  }
};

const getExternalRecipe = async (id) => {
  try {
    const recipe = (
      await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}`,
      )
    ).data;

    const instructions =
      recipe.analyzedInstructions.length > 0
        ? recipe.analyzedInstructions[0].steps.map((step) => step.step)
        : [];

    return {
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      diets: recipe.diets,
      summary: recipe.summary.replace(/<[^>]*>?/g, ""),
      score: recipe.spoonacularScore,
      healthScore: recipe.healthScore,
      instructions,
    };
  } catch (error) {
    console.error(`Failed to get external recipe detail ${id}: ${error}`);
    return null;
  }
};
