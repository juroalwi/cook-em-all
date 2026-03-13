import axios from "axios";
import { Op } from "@sequelize/core";
import { recipeModel, dietModel } from "../../db.js";

export const getRecipes = async (req, res, next) => {
  const query = req.query.title?.toLowerCase();

  try {
    const internalRecipes = await getInternalRecipes(query);

    if (internalRecipes.length > 0) {
      return res.send(internalRecipes);
    }

    const externalRecipes = await getExternalRecipes(query);

    if (externalRecipes.length > 0) {
      return res.send(externalRecipes);
    }

    return res.status(404).send("Recipes not found");
  } catch (error) {
    console.error(`Failed to get recipes: ${error}`);
    next(error);
  }
};

const getInternalRecipes = async (query) => {
  try {
    const dbResponse = await recipeModel.findAll({
      order: [["id", "ASC"]],
      limit: 100,
      attributes: ["id", "title", "image", "score"],
      include: {
        model: dietModel,
        as: "diets",
        attributes: ["name"],
        through: { attributes: [] },
      },
      where: {
        title: {
          [Op.iLike]: `%${query}%`,
        },
      },
    });

    const dbRecipes = dbResponse.map((recipe) => ({
      ...recipe.dataValues,
      diets: recipe.dataValues.diets.map((diet) => diet.name),
    }));

    return dbRecipes;
  } catch (error) {
    console.error(`Failed to get internal recipes: ${error}`);
    return [];
  }
};

const getExternalRecipes = async (query) => {
  try {
    const apiResponse = await axios.get(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&addRecipeInformation=true&query=${query}&number=10`,
    );

    const apiRecipes = apiResponse.data.results.map((recipe) => {
      const { id, title, image, diets, spoonacularScore } = recipe;
      if (recipe.vegetarian && !diets.includes("vegetarian")) {
        diets.push("vegetarian");
      }
      if (recipe.vegan && !diets.includes("vegan")) {
        diets.push("vegetarian");
      }
      if (recipe.glutenFree && !diets.includes("gluten free")) {
        diets.push("gluten free");
      }
      if (recipe.dairyFree && !diets.includes("dairy free")) {
        diets.push("gluten free");
      }

      return {
        id,
        title,
        image,
        diets,
        score: spoonacularScore,
      };
    });

    return apiRecipes;
  } catch (error) {
    console.error(
      `Failed to get external recipes for query ${query}: ${error}`,
    );
    return [];
  }
};
