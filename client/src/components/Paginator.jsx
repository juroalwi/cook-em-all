import { twMerge } from "tailwind-merge";
import { RightArrowIcon } from "src/media/icons/RightArrowIcon.jsx";
import { LeftArrowIcon } from "src/media/icons/LeftArrowIcon.jsx";

export const Paginator = ({ onPageClick, currentPage, maxPage, isMobile }) => {
  const pages = [...Array(maxPage).keys()].map((i) => i + 1);

  if (isMobile) {
    return (
      <PaginatorMobile
        onPageClick={onPageClick}
        currentPage={currentPage}
        maxPage={maxPage}
      />
    );
  }

  return (
    <div className="bg-transparent">
      {pages.length > 1 &&
        pages.map((page) => {
          const isSelected = page === currentPage;
          return (
            <button
              key={page}
              className={twMerge(
                "text-custom-white hover:bg-custom-black h-14 w-14 cursor-pointer rounded-xs bg-transparent text-xl font-semibold transition-colors duration-300",
                isSelected && "bg-custom-red hover:bg-custom-red",
              )}
              onClick={() => onPageClick(page)}
            >
              {page}
            </button>
          );
        })}
    </div>
  );
};

const PaginatorMobile = ({ onPageClick, currentPage, maxPage }) => {
  return (
    <div className="flex items-center gap-8">
      {currentPage > 1 && (
        <LeftArrowIcon
          fill="#FAF0E0"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => onPageClick(currentPage - 1)}
        />
      )}
      <div className="text-custom-white text-lg font-semibold">
        {currentPage}
      </div>
      {currentPage < maxPage && (
        <RightArrowIcon
          fill="#FAF0E0"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() => onPageClick(currentPage + 1)}
        />
      )}
    </div>
  );
};
