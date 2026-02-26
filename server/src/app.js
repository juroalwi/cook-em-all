import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { recipesRouter } from "./routes/recipes/index.js";
import { dietsRouter } from "./routes/diets/index.js";

const app = express();

app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use((_req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Update to match the domain you will make the request from.
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});
app.use("/recipes", recipesRouter);
app.use("/diets", dietsRouter);
app.use((error, _req, res, _next) => {
  const status = error.status || 500;
  const message = error.message || error;
  res.status(status).send(message);
});

export { app };
