import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <input
      type="text"
      name="query"
      autoComplete="off"
      placeholder="Search recipe..."
      onChange={handleChange}
      value={query}
      className="py-3.75! px-7.5! w-full max-w-150 bg-custom-white text-custom-black text-base"
    />
  );
}
