import * as S from "./RecipesFilters.styled.js";
import useRecipes from "../../hooks/useRecipes.js";
import useDiets from "../../hooks/useDiets.js";
import useScreenSize from "../../hooks/useScreenSize.js";
import FiltersIcon from "../../media/icons/FiltersIcon.jsx";
import { colors } from "../GlobalStyle.styled.js";
import { useState } from "react";

export default function DisplayParameters() {
  const { isMobile } = useScreenSize();
  const { diets } = useDiets();
  const { setRecipesFilters, setRecipesSortBy, recipesFilters, recipesSortBy } =
    useRecipes();

  function handleFiltersUpdate(filter) {
    const index = recipesFilters.indexOf(filter);
    setRecipesFilters(
      index !== -1
        ? recipesFilters.filter((selectedFilter) => selectedFilter !== filter)
        : [...recipesFilters, filter],
    );
  }

  function handleSortByUpdate(sortBy) {
    if (sortBy === recipesSortBy) {
      setRecipesSortBy(null);
    } else {
      setRecipesSortBy(sortBy);
    }
  }

  if (isMobile) {
    return (
      <RecipesFiltersMobile
        diets={diets}
        recipesSortBy={recipesSortBy}
        recipesFilters={recipesFilters}
        handleSortByUpdate={handleSortByUpdate}
        handleFiltersUpdate={handleFiltersUpdate}
      />
    );
  }

  return (
    <S.Container>
      <S.SortSection>
        <S.SortButtton>
          Sort by
          {recipesSortBy
            ? `: ${recipesSortBy === "az" ? "a-z" : recipesSortBy === "za" ? "z-a" : "score"}`
            : ""}
        </S.SortButtton>
        <S.SortDropdown>
          <S.SortItem
            active={recipesSortBy === "az"}
            onClick={() => handleSortByUpdate("az")}
          >
            (a-z)
          </S.SortItem>
          <S.SortItem
            active={recipesSortBy === "za"}
            onClick={() => handleSortByUpdate("za")}
          >
            (z-a)
          </S.SortItem>
          <S.SortItem
            active={recipesSortBy === "score"}
            onClick={() => handleSortByUpdate("score")}
          >
            score
          </S.SortItem>
        </S.SortDropdown>
      </S.SortSection>

      <S.FiltersSection>
        <S.FiltersButton>Filters ({recipesFilters.length})</S.FiltersButton>
        <S.FiltersDropdown>
          {diets.map((diet, index) => {
            const active = recipesFilters.includes(diet);
            return (
              <S.FilterItem
                key={index}
                active={active}
                onClick={() => handleFiltersUpdate(diet)}
              >
                {diet}
              </S.FilterItem>
            );
          })}
        </S.FiltersDropdown>
      </S.FiltersSection>
    </S.Container>
  );
}

function RecipesFiltersMobile({
  diets,
  recipesSortBy,
  recipesFilters,
  handleSortByUpdate,
  handleFiltersUpdate,
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <S.MobileContainer>
      <S.MobileDropdownButton onClick={() => setIsOpen((v) => !v)}>
        <FiltersIcon fill={colors.WHITE} height="36px" width="36px" />
      </S.MobileDropdownButton>

      {isOpen && (
        <S.MobileDropdown>
          <S.MobileDropdownTitle>Sort by</S.MobileDropdownTitle>

          <S.MobileSortByContainer>
            <S.MobileSortByItem
              active={recipesSortBy === "az"}
              onClick={() => handleSortByUpdate("az")}
            >
              (a-z)
            </S.MobileSortByItem>
            <S.MobileSortByItem
              active={recipesSortBy === "za"}
              onClick={() => handleSortByUpdate("za")}
            >
              (z-a)
            </S.MobileSortByItem>
            <S.MobileSortByItem
              active={recipesSortBy === "score"}
              onClick={() => handleSortByUpdate("score")}
            >
              score
            </S.MobileSortByItem>
          </S.MobileSortByContainer>

          <S.MobileDropdownTitle>Filters</S.MobileDropdownTitle>
          <S.MobileFiltersContainer>
            {diets.map((diet, index) => {
              const active = recipesFilters.includes(diet);
              return (
                <S.MobileFilterItem
                  key={index}
                  active={active}
                  onClick={() => handleFiltersUpdate(diet)}
                >
                  {diet}
                </S.MobileFilterItem>
              );
            })}
          </S.MobileFiltersContainer>
        </S.MobileDropdown>
      )}
    </S.MobileContainer>
  );
}
