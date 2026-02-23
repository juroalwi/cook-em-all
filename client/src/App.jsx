/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar.jsx";
import Recipes from "./components/Recipes/Recipes.jsx";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail.jsx";
import CreateRecipeSmart from "./components/CreateRecipe/CreateRecipeSmart.jsx";

import useScreenSize from "./hooks/useScreenSize.js";
import useDiets from "./hooks/useDiets.js";
import useRecipes from "./hooks/useRecipes.js";

export default function App() {
  const { fetchDiets } = useDiets();
  const { fetchRecipes } = useRecipes();
  const { isMobile } = useScreenSize();

  useEffect(() => {
    fetchDiets();
    fetchRecipes();
  }, []);

  return (
    <div
      className={
        isMobile
          ? "mx-auto max-w-120 min-w-[280px]"
          : "flex min-h-screen flex-col"
      }
    >
      <NavBar />
      <Routes>
        <Route path="/recipe/detail/:id" element={<RecipeDetail />} />
        <Route path="/recipe/create" element={<CreateRecipeSmart />} />
        <Route path="/*" element={<Recipes />} index={true} />
      </Routes>
    </div>
  );
}
