import React from "react";
import { useSelector } from "react-redux";
import DisplayParameters from "../DisplayParameters/DisplayParameters.jsx";
import Recipes from "../Recipes/Recipes.jsx";
import Paginator from "../Paginator/Paginator.jsx";
import Loading from "../Loading/Loading.jsx";
import NotFound from "../NotFound/NotFound.jsx";
import * as S from "./Main.styled.js";

export default function Main() {
  const { status } = useSelector((state) => state.recipesDisplayParameters);

  switch (status) {
    case "loading":
      return <Loading />;
    case "not found":
      return <NotFound />;
    case "displaying":
      return (
        <S.Main>
          <S.Top>
            <S.Left>
              <DisplayParameters />
            </S.Left>

            <S.Right>
              <Recipes />
            </S.Right>
          </S.Top>

          <S.Bottom>
            <Paginator />
          </S.Bottom>
        </S.Main>
      );
    default:
      return <></>;
  }
}
