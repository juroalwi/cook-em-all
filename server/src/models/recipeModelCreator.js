import { DataTypes } from "@sequelize/core";
import { randomUUID } from "crypto";

export const recipeModelCreator = (sequelize) => {
  sequelize.define("recipe", {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: () => `CREATED_${randomUUID()}`,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    summary: {
      type: DataTypes.TEXT,
    },
    score: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 100,
      },
    },
    health_score: {
      type: DataTypes.FLOAT,
      validate: {
        min: 0,
        max: 100,
      },
    },
    instructions: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
    },
  });
};
