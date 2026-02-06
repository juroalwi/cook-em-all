/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import NavBar from "./components/NavBar/NavBar.jsx";
import Main from "./components/Main/Main.jsx";
import RecipeDetail from "./components/RecipeDetail/RecipeDetail.jsx";
import CreateRecipeSmart from "./components/CreateRecipe/CreateRecipeSmart.jsx";
import { getDiets, getRecipes, setStatus } from "./redux/actions.js";
import { GlobalStyle } from "./components/GlobalStyle.styled.js";
import useScreenSize from "./hooks/useScreenSize.js";

export default function App() {
  const dispatch = useDispatch();
  const { isMobile } = useScreenSize();

  useEffect(() => {
    (async function () {
      dispatch(setStatus("loading"));
      try {
        const response = await axios.get(`/diets`);
        const diets = response.data;
        dispatch(getDiets(diets));
      } catch (error) {
        console.error(error);
      }

      dispatch(getRecipes(null, { defaultRecipes: true }));
    })();
  }, []);

  return (
    <div
      style={
        isMobile
          ? {
              maxWidth: "600px",
              marginRight: "auto",
              marginLeft: "auto",
            }
          : {}
      }
    >
      <GlobalStyle />
      <NavBar />
      <Routes>
        <Route path="/recipe/detail/:id" element={<RecipeDetail />} />
        <Route path="/recipe/create" element={<CreateRecipeSmart />} />
        <Route path="/*" element={<Main />} index={true} />
      </Routes>
    </div>
  );
}
