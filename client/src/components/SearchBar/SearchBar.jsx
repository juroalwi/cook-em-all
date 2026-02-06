import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRecipes, setStatus } from "../../redux/actions.js";
import * as S from "./SearchBar.styled.js";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleChange(event) {
    setQuery(event.target.value);
  }

  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(setStatus("loading"));
      dispatch(getRecipes(query, { defaultRecipes: false }));
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
