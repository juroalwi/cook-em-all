import useScreenSize from "../../hooks/useScreenSize.js";
import RightArrowIcon from "../../media/icons/RightArrowIcon.jsx";
import LeftArrowIcon from "../../media/icons/LeftArrowIcon.jsx";
import useRecipes from "../../hooks/useRecipes.js";
import { twMerge } from "tailwind-merge";

export default function Paginator() {
  const { isMobile } = useScreenSize();
  const { setRecipesPage, recipesPage, recipesMaxPage } = useRecipes();

  function handlePageChange(newPage) {
    setRecipesPage(newPage);
  }

  const pages = [...Array(recipesMaxPage).keys()].map((i) => i + 1);

  if (isMobile) {
    return (
      <div className="flex items-center gap-8">
        {recipesPage > 1 && (
          <LeftArrowIcon
            fill="#FAF0E0"
            className="cursor-pointer"
            onClick={() => handlePageChange(recipesPage - 1)}
          />
        )}
        <div className="text-custom-white text-2xl font-semibold">
          {recipesPage}
        </div>
        {recipesPage < recipesMaxPage && (
          <RightArrowIcon
            fill="#FAF0E0"
            className="cursor-pointer"
            onClick={() => handlePageChange(recipesPage + 1)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="bg-transparent">
      {pages.length > 1 &&
        pages.map((page) => {
          const isSelected = page === recipesPage;
          return (
            <button
              key={page}
              className={twMerge(
                "text-custom-white hover:bg-custom-black h-14 w-14 bg-transparent text-xl font-semibold transition-colors duration-300 cursor-pointer rounded-xs",
                isSelected && "bg-custom-red hover:bg-custom-red",
              )}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          );
        })}
    </div>
  );
}
