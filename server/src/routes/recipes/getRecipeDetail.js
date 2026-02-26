import axios from "axios";
import { recipeModel, dietModel } from "../../db.js";

export const getRecipeDetail = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id.replace("EXTERNAL_", ""), 10);

    if (req.params.id.includes("EXTERNAL_")) {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`,
      );
      const recipe = response.data;
      const { title, image, diets, summary, spoonacularScore, healthScore } =
        recipe;
      const instructions =
        recipe.analyzedInstructions.length > 0
          ? recipe.analyzedInstructions[0].steps.map((step) => step.step)
          : [];

      res.status(200).send({
        id: "EXTERNAL_" + recipe.id,
        title,
        image,
        diets,
        summary: summary.replace(/<[^>]*>?/g, ""),
        score: spoonacularScore / 20,
        healthScore,
        instructions,
      });
    } else {
      const response = await Recipe.findByPk(id, {
        include: {
          model: Diet,
          as: "diets",
          attributes: ["name"],
          through: { attributes: [] },
        },
      });

      const recipe =
        response !== null
          ? {
              ...response?.dataValues,
              diets: response.dataValues.diets.map((diet) => diet.name),
            }
          : {};

      res.send(recipe);
    }
  } catch (error) {
    next(error);
  }
};
