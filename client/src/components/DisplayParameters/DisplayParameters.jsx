import * as S from "./DisplayParameters.styled.js";
import useRecipes from "../../hooks/useRecipes.js";
import useDiets from "../../hooks/useDiets.js";

export default function DisplayParameters() {
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

  return (
    <S.DisplayParameters>
      <S.FiltersSection>
        <S.FiltersButton>Filters ({recipesFilters.length})</S.FiltersButton>
        <S.FiltersDropdown>
          {diets.map((diet, index) => {
            const active = recipesFilters.includes(diet);
            return (
              <S.FilterItem
                key={index}
                active={active}
                onClick={() => handleFiltersUpdate(diet, index)}
              >
                {diet}
              </S.FilterItem>
            );
          })}
        </S.FiltersDropdown>
      </S.FiltersSection>

      <S.SortSection>
        <S.SortButtton>
          Sort
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
    </S.DisplayParameters>
  );
}
