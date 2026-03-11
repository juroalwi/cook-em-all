import { useDiets } from "src/hooks/useDiets";
import { useRecipes } from "src/hooks/useRecipes";
import { useScreenSize } from "src/hooks/useScreenSize";
import { fetchStatus } from "src/utils/constants";
import { Loading } from "src/components/Loading";
import { Paginator } from "src/components/Paginator";
import { RecipeCard } from "./RecipeCard";
import { RecipesFilters } from "./RecipesFilters";

export const Recipes = () => {
  const { isMobile } = useScreenSize();
  const { diets, dietsStatus } = useDiets();
  const {
    displayedRecipes,
    recipesStatus,
    recipesFilters,
    recipesSortBy,
    recipesPage,
    recipesMaxPage,
    setRecipesFilters,
    setRecipesSortBy,
    setRecipesPage,
    fetchRecipes,
  } = useRecipes();

  if (
    recipesStatus === fetchStatus.LOADING ||
    dietsStatus === fetchStatus.LOADING
  ) {
    return <Loading />;
  }

  if (recipesStatus === fetchStatus.NOT_FOUND) {
    return (
      <Wrapper
        diets={diets}
        recipesFilters={recipesFilters}
        recipesSortBy={recipesSortBy}
        recipesPage={recipesPage}
        recipesMaxPage={recipesMaxPage}
        setRecipesFilters={setRecipesFilters}
        setRecipesSortBy={setRecipesSortBy}
        setRecipesPage={setRecipesPage}
        isMobile={isMobile}
      >
        <RecipesNotFound
          onReset={() => {
            fetchRecipes(null);
            setRecipesFilters([]);
          }}
        />
      </Wrapper>
    );
  }

  return (
    <Wrapper
      diets={diets}
      recipesFilters={recipesFilters}
      recipesSortBy={recipesSortBy}
      recipesPage={recipesPage}
      recipesMaxPage={recipesMaxPage}
      setRecipesFilters={setRecipesFilters}
      setRecipesSortBy={setRecipesSortBy}
      setRecipesPage={setRecipesPage}
      isMobile={isMobile}
    >
      <div className="flex flex-wrap justify-center gap-3 lg:gap-8">
        {displayedRecipes.map((recipe) => {
          return (
            <RecipeCard
              key={recipe.id}
              id={recipe.id}
              title={recipe.title}
              image={recipe.image}
              diets={recipe.diets}
              score={recipe.score}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

const Wrapper = ({
  children,
  diets,
  recipesFilters,
  recipesSortBy,
  recipesPage,
  recipesMaxPage,
  setRecipesFilters,
  setRecipesSortBy,
  setRecipesPage,
  isMobile,
}) => {
  return (
    <div className="flex h-full flex-grow flex-col gap-8 p-8 max-lg:p-4">
      <div className="w-full pl-32 max-lg:pl-0">
        <RecipesFilters
          diets={diets}
          setRecipesFilters={setRecipesFilters}
          setRecipesSortBy={setRecipesSortBy}
          recipesFilters={recipesFilters}
          recipesSortBy={recipesSortBy}
          isMobile={isMobile}
        />
      </div>

      {children}

      <div className="mt-auto flex justify-center">
        <Paginator
          onPageClick={(page) => setRecipesPage(page)}
          currentPage={recipesPage}
          maxPage={recipesMaxPage}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};
