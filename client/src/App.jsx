import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Recipes } from "./pages/Recipes/index.jsx";
import { RecipeDetail } from "./pages/RecipeDetail/index.jsx";
import { CreateRecipe } from "./pages/CreateRecipe/index.jsx";
import { useScreenSize } from "./hooks/useScreenSize.js";
import { useDiets } from "./hooks/useDiets.js";
import { useRecipes } from "./hooks/useRecipes.js";
import { NavBar } from "./components/NavBar";

export const App = () => {
  const { fetchDiets } = useDiets();
  const { fetchRecipes } = useRecipes();
  const { isMobile } = useScreenSize();

  useEffect(() => {
    fetchDiets();
    fetchRecipes();
  }, [fetchDiets, fetchRecipes]);

  return (
    <div
      className={
        isMobile ? "mx-auto max-w-120 min-w-70" : "flex min-h-screen flex-col"
      }
    >
      <NavBar />
      <Routes>
        <Route path="/recipe/detail/:id" element={<RecipeDetail />} />
        <Route path="/recipe/create" element={<CreateRecipe />} />
        <Route path="/*" element={<Recipes />} index={true} />
      </Routes>
    </div>
  );
};
