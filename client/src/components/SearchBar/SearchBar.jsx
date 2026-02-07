import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./SearchBar.styled.js";
import useRecipes from "../../hooks/useRecipes.js";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const { fetchRecipes } = useRecipes();
  const navigate = useNavigate();

  function handleChange(event) {
    setQuery(event.target.value);
  }

  useEffect(() => {
    const id = setTimeout(() => {
      fetchRecipes(query);
      navigate("/");
    }, 400);
    return () => clearTimeout(id);
  }, [query]);

  return (
    <S.Query
      type="text"
      name="query"
      autoComplete="off"
      placeholder="Search recipe..."
      onChange={handleChange}
      value={query}
    />
  );
}
