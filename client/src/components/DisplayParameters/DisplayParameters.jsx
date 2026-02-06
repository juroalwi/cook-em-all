import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { filterRecipes, sortRecipes } from "../../redux/actions.js";
import * as S from "./DisplayParameters.styled.js";

export default function DisplayParameters() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const { diets } = useSelector((state) => state);
  const { sortCriteria } = useSelector(
    (state) => state.recipesDisplayParameters,
  );
  const dispatch = useDispatch();

  function handleFilter(filter) {
    const index = selectedFilters.indexOf(filter);
    index !== -1
      ? setSelectedFilters(
          selectedFilters.filter((selectedFilter) => selectedFilter !== filter),
        )
      : setSelectedFilters([...selectedFilters, filter]);

    dispatch(filterRecipes(filter));
  }

  function handleOrder(sortCriteria) {
    dispatch(sortRecipes(sortCriteria));
  }

  return (
    <S.DisplayParameters>
      <S.SortSection>
        <S.SortButtton>Order by</S.SortButtton>
        <S.SortDropdown>
          <S.SortItem
            active={sortCriteria === "az"}
            onClick={() => handleOrder("az")}
          >
            (a-z)
          </S.SortItem>
          <S.SortItem
            active={sortCriteria === "za"}
            onClick={() => handleOrder("za")}
          >
            (z-a)
          </S.SortItem>
          <S.SortItem
            active={sortCriteria === "score"}
            onClick={() => handleOrder("score")}
          >
            score
          </S.SortItem>
        </S.SortDropdown>
      </S.SortSection>

      <S.FiltersSection>
        <S.FiltersButton>Filter by</S.FiltersButton>
        <S.FiltersDropdown>
          {diets.map((diet, index) => {
            const active = selectedFilters.includes(diet);
            return (
              <S.FilterItem
                key={index}
                active={active}
                onClick={() => handleFilter(diet, index)}
              >
                {diet}
              </S.FilterItem>
            );
          })}
        </S.FiltersDropdown>
      </S.FiltersSection>
    </S.DisplayParameters>
  );
}
