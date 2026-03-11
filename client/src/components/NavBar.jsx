import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecipes } from "src/hooks/useRecipes.js";

export const NavBar = () => {
  const navigate = useNavigate();
  const { fetchRecipes } = useRecipes();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const id = setTimeout(() => {
      fetchRecipes(query);
      navigate("/");
    }, 400);
    return () => clearTimeout(id);
  }, [query]);

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <nav className="lg:light-shadow-small flex flex-col-reverse items-center justify-between gap-4 bg-transparent px-4 py-2 lg:flex-row lg:gap-16 lg:px-8 lg:py-4">
      <div className="hidden w-full items-center justify-center gap-4 lg:flex">
        <div
          className="flex cursor-pointer items-center gap-4"
          onClick={handleLogoClick}
        >
          <img
            src="/logo.svg"
            className="h-17.5 invert-100"
            alt="Cook 'Em All Logo"
          />
          <div className="text-custom-white text-2xl tracking-wider uppercase">
            Cook 'Em All
          </div>
        </div>
      </div>

      <SearchBar value={query} onChange={(query) => setQuery(query)} />

      <div className="flex w-full items-center justify-evenly gap-8">
        <p
          onClick={() => navigate("/")}
          className="text-custom-white cursor-pointer text-lg font-medium transition-opacity duration-100 hover:opacity-80 lg:text-xl"
        >
          Home
        </p>

        <p
          onClick={() => navigate("/recipe/create")}
          className="text-custom-white cursor-pointer text-lg font-medium transition-opacity duration-100 hover:opacity-80 lg:text-xl"
        >
          Create recipe
        </p>
      </div>
    </nav>
  );
};

const SearchBar = ({ value, onChange }) => {
  const handleChange = (event) => {
    onChange(event.target.value);
  };

  return (
    <input
      type="text"
      name="query"
      autoComplete="off"
      placeholder="Search recipe..."
      onChange={handleChange}
      value={value}
      className="bg-custom-white text-custom-black w-full max-w-150 rounded-xs px-7.5! py-3.75! text-base"
    />
  );
};
