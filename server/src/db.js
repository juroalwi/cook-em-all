import { Sequelize } from "@sequelize/core";
import { recipeModelCreator } from "./models/recipeModelCreator.js";
import { dietModelCreator } from "./models/dietModelCreator.js";

// Initialize data base.
const { Sequelize } = require("sequelize");
const sequelize =
  process.env.NODE_ENV === "production"
    ? new Sequelize(DATABASE_URL, {
        dialect: "postgres",
        dialectOptions: {
          pool: {
            max: 3,
            min: 0,
            idle: 10000,
          },
          keepAlive: true,
        },
        ssl: true,
        define: { timestamps: false },
      })
    : new Sequelize(
        `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
        {
          logging: false,
          native: false,
          define: { timestamps: false },
        }
      );

// Connect models to sequelize.
const RecipeModelCreator = require("./models/Recipe.js");
const DietModelCreator = require("./models/Diet");
RecipeModelCreator(sequelize);
DietModelCreator(sequelize);

// Associations.
const { Recipe, Diet } = sequelize.models;
Recipe.belongsToMany(Diet, {
  as: "diets",
  through: "RecipesDiets",
  foreignKey: "recipeId",
});
Diet.belongsToMany(Recipe, {
  as: "recipes",
  through: "RecipesDiets",
  foreignKey: "dietId",
});

export { recipeModel, dietModel };

export default sequelize;
