import { useState } from "react";
import { FiltersIcon } from "src/media/icons/FiltersIcon";
import { Tag } from "src/components/Tag";

export const RecipesFilters = ({
  diets,
  setRecipesFilters,
  setRecipesSortBy,
  recipesFilters,
  recipesSortBy,
  isMobile,
}) => {
  const handleFiltersUpdate = (filter) => {
    const index = recipesFilters.indexOf(filter);
    setRecipesFilters(
      index !== -1
        ? [
            ...recipesFilters.slice(0, index),
            ...recipesFilters.slice(index + 1),
          ]
        : [...recipesFilters, filter],
    );
  };

  const handleSortByUpdate = (sortBy) => {
    if (sortBy === recipesSortBy) {
      setRecipesSortBy(null);
    } else {
      setRecipesSortBy(sortBy);
    }
  };

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
    <div className="text-custom-white flex items-center gap-16">
      <div className="group relative cursor-pointer">
        <div className="light-shadow-small w-60 rounded-xs px-12 py-3 text-center text-xl font-medium transition-all duration-200 group-hover:opacity-80 group-hover:shadow-none">
          Sort by
          {recipesSortBy
            ? `: ${recipesSortBy === "az" ? "a-z" : recipesSortBy === "za" ? "z-a" : "score"}`
            : ""}
        </div>

        <div className="absolute z-10 hidden w-full rounded-xs bg-black shadow-[2px_4px_16px_0px_rgba(45,45,45,1)] group-hover:block">
          <p
            className={`hover:bg-custom-white hover:text-custom-black px-4 py-3 text-xl tracking-wide transition-colors duration-200 ${
              recipesSortBy === "az" ? "text-custom-red" : "text-custom-white"
            }`}
            onClick={() => handleSortByUpdate("az")}
          >
            (a-z)
          </p>
          <p
            className={`hover:bg-custom-white hover:text-custom-black px-4 py-3 text-xl tracking-wide transition-colors duration-200 ${
              recipesSortBy === "za" ? "text-custom-red" : "text-custom-white"
            }`}
            onClick={() => handleSortByUpdate("za")}
          >
            (z-a)
          </p>
          <p
            className={`hover:bg-custom-white hover:text-custom-black px-4 py-3 text-xl tracking-wide transition-colors duration-200 ${
              recipesSortBy === "score"
                ? "text-custom-red"
                : "text-custom-white"
            }`}
            onClick={() => handleSortByUpdate("score")}
          >
            score
          </p>
        </div>
      </div>

      <div className="group relative cursor-pointer">
        <div className="w-60 px-12 py-3 text-center text-xl font-medium shadow-[1px_2px_8px_0px_rgba(45,45,45,1)] transition-all duration-200 group-hover:opacity-80 group-hover:shadow-none">
          Filters ({recipesFilters.length})
        </div>
        <div className="absolute z-10 hidden w-100 flex-wrap gap-2 rounded-xs bg-black p-4 shadow-[2px_4px_16px_0px_rgba(45,45,45,1)] group-hover:flex">
          {diets.map((diet) => {
            const isOn = recipesFilters.includes(diet);
            return (
              <Tag
                key={diet}
                name={diet}
                isOn={isOn}
                onClick={() => handleFiltersUpdate(diet)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

const RecipesFiltersMobile = ({
  diets,
  recipesSortBy,
  recipesFilters,
  handleSortByUpdate,
  handleFiltersUpdate,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="text-custom-white relative flex justify-end">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="ml-auto w-fit bg-transparent"
      >
        <FiltersIcon fill="#FAF0E0" height="36px" width="36px" />
      </button>

      {isOpen && (
        <div className="light-shadow absolute top-full z-10 flex w-[90%] flex-col gap-2 rounded-xs bg-black p-4">
          <div className="text-lg font-semibold">Sort by</div>

          <div className="flex cursor-pointer gap-4 p-2">
            <div
              className={`text-lg ${
                recipesSortBy === "az" ? "text-custom-red" : "text-custom-white"
              }`}
              onClick={() => handleSortByUpdate("az")}
            >
              (a-z)
            </div>
            <div
              className={`text-lg ${
                recipesSortBy === "za" ? "text-custom-red" : "text-custom-white"
              }`}
              onClick={() => handleSortByUpdate("za")}
            >
              (z-a)
            </div>
            <div
              className={`text-lg ${
                recipesSortBy === "score"
                  ? "text-custom-red"
                  : "text-custom-white"
              }`}
              onClick={() => handleSortByUpdate("score")}
            >
              score
            </div>
          </div>

          <div className="text-lg font-semibold">Filters</div>
          <div className="flex cursor-pointer flex-wrap gap-2 p-2">
            {diets.map((diet) => {
              const isOn = recipesFilters.includes(diet);
              return (
                <Tag
                  key={diet}
                  name={diet}
                  isOn={isOn}
                  onClick={() => handleFiltersUpdate(diet)}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
