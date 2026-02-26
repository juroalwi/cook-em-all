import axios from "axios";
import { recipeModel, dietModel } from "../../db.js";

export const getRecipeDetail = async (req, res, next) => {
  try {
    const id = req.params.id;

    if (!id) {
      res.status(400).send("Invalid recipe ID provided.");
    }

    const internalRecipe = await getInternalRecipe(id);

    if (internalRecipe) {
      return res.status(200).send(internalResult);
    }

    if (!internalRecipe && id.includes("CREATED_")) {
      return res.status(404).send("Recipe not found");
    }

    const externalRecipe = await getExternalRecipe(id);

    if (!externalRecipe) {
      return res.status(404).send("Recipe not found");
    }

    return res.status(200).send(externalRecipe);
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
      ...response.dataValues,
      diets: response.dataValues.diets.map((diet) => diet.name),
    };
  } catch (error) {
    console.error(`Failed to get internal recipe detail ${id}: ${error}`);
    return null;
  }
};

const getExternalRecipe = async (id) => {
  try {
    const response = await axios.get(
      `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}`,
    );

    const recipe = response.data;

    const { id, title, image, diets, summary, spoonacularScore, healthScore } =
      recipe;

    const instructions =
      recipe.analyzedInstructions.length > 0
        ? recipe.analyzedInstructions[0].steps.map((step) => step.step)
        : [];

    return {
      id,
      title,
      image,
      diets,
      summary: summary.replace(/<[^>]*>?/g, ""),
      score: spoonacularScore,
      healthScore,
      instructions,
    };
  } catch (error) {
    console.error(`Failed to get internal recipe detail ${id}: ${error}`);
    return null;
  }
};
