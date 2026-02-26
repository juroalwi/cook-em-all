import { Sequelize } from "@sequelize/core";
import { recipeModelCreator } from "./models/recipeModelCreator.js";
import { dietModelCreator } from "./models/dietModelCreator.js";

const sequelize =
  process.env.NODE_ENV === "prod"
    ? new Sequelize({
        url: process.env.DB_URL,
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
    : new Sequelize({
        url: process.env.DB_URL,
        dialect: "postgres",
        native: false,
        define: { timestamps: false },
      });

recipeModelCreator(sequelize);
dietModelCreator(sequelize);

const recipeModel = sequelize.models.get("recipe");
const dietModel = sequelize.models.get("diet");

recipeModel.belongsToMany(dietModel, {
  through: "recipes_diets",
  foreignKey: { name: "recipe_id" },
  otherKey: { name: "diet_id" },
});

dietModel.belongsToMany(recipeModel, {
  through: "recipes_diets",
  foreignKey: { name: "diet_id" },
  otherKey: { name: "recipe_id" },
});

export { recipeModel, dietModel };

export default sequelize;
