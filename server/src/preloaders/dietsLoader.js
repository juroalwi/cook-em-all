import { dietModel } from "../db.js";
import { dietsData } from "./dietsData.js";

export const dietsLoader = () => {
  return dietsData.map(async (diet) => {
    try {
      await dietModel.create({ name: diet });
    } catch (error) {
      console.error(`Failed to preload recipes: ${error}`);
      throw error;
    }
  });
};
