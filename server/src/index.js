import "dotenv/config";
import sequelize from "./db.js";
import { app } from "./app.js";
import { dietsLoader } from "./preloaders/dietsLoader.js";
import { recipesLoader } from "./preloaders/recipesLoader.js";

const port = process.env.PORT || 3000;

sequelize.sync({ force: true }).then(async () => {
  console.log("Data base created.");
  await Promise.all(dietsLoader());
  console.log("Diets loaded.");
  await Promise.all(recipesLoader());
  console.log("Default recipes loaded.");
  app.listen(port, () => {
    console.log(`Server listening at ${port}.`);
  });
});
