import { Router } from "express";
import { dietModel } from "../../db.js";

const dietsRouter = Router();

dietsRouter.get("/", async (_req, res, next) => {
  try {
    const response = await Diet.findAll();
    const diets = response.map((diet) => diet.dataValues.name);
    res.send(diets);
  } catch (error) {
    next(error);
  }
});

export { dietsRouter };
