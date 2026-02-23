import useScreenSize from "../../hooks/useScreenSize.js";
import RightArrowIcon from "../../media/icons/RightArrowIcon.jsx";
import LeftArrowIcon from "../../media/icons/LeftArrowIcon.jsx";
import useRecipes from "../../hooks/useRecipes.js";

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
        {recipesPage > 0 && (
          <LeftArrowIcon
            fill="#FAF0E0"
            onClick={() => handlePageChange(recipesPage - 1)}
          />
        )}
        <div className="text-2xl font-semibold text-custom-white">
          {recipesPage + 1}
        </div>
        {recipesPage < recipesMaxPage && (
          <RightArrowIcon
            fill="#FAF0E0"
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
              className={`h-14 w-14 text-xl font-semibold bg-transparent text-custom-white transition-colors duration-300 hover:bg-gray-800 ${
                isSelected ? "bg-custom-red" : ""
              }`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          );
        })}
    </div>
  );
}
