import * as S from "./Paginator.styled.js";
import { colors } from "../GlobalStyle.styled.js";
import useScreenSize from "../../hooks/useScreenSize.js";
import RightArrowIcon from "../../media/icons/RightArrowIcon.jsx";
import LeftArrowIcon from "../../media/icons/LeftArrowIcon.jsx";
import useRecipes from "../../hooks/useRecipes.js";

export default function Paginator() {
  const { isMobile } = useScreenSize();
  const { setRecipesPage, recipesPage, recipesMaxPage } = useRecipes();

  function handlePageChange(newPage) {
    setRecipesPage(newPage);
  }

  const pages = [...Array(recipesMaxPage).keys()].map((i) => i + 1);

  if (isMobile) {
    return (
      <S.MobileContainer>
        {recipesPage > 0 && (
          <LeftArrowIcon
            fill={colors.WHITE}
            onClick={() => handlePageChange(recipesPage - 1)}
          />
        )}
        <S.CurrentPage>{recipesPage + 1}</S.CurrentPage>
        {recipesPage < recipesMaxPage && (
          <RightArrowIcon
            fill={colors.WHITE}
            onClick={() => handlePageChange(recipesPage + 1)}
          />
        )}
      </S.MobileContainer>
    );
  }

  return (
    <S.Paginator>
      {pages.length > 1 &&
        pages.map((page) => {
          const selectedButtonStyle =
            page === recipesPage ? { backgroundColor: colors.RED } : undefined;
          return (
            <S.Button
              key={page}
              style={selectedButtonStyle}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </S.Button>
          );
        })}
    </S.Paginator>
  );
}
