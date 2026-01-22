require("dotenv").config();
const app = require("./app.js");
const db = require("./db.js");
const dietsLoader = require("./preloaders/dietsLoader.js");
const recipesLoader = require("./preloaders/recipesLoader.js");

// Syncing all the models at once.
db.sync({ force: true }).then(async () => {
  console.log("Data base created.");
  await Promise.all(dietsLoader());
  console.log("Diets loaded.");
  await Promise.all(recipesLoader());
  console.log("Default recipes loaded.");
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening at ${process.env.PORT || 3000}.`);
  });
});
