import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "../../hooks/useRecipes.js";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const { fetchRecipes } = useRecipes();
  const navigate = useNavigate();

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

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
      className="bg-custom-white text-custom-black w-full max-w-150 rounded-xs px-7.5! py-3.75! text-base"
    />
  );
};
