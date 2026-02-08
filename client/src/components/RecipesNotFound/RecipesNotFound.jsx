import * as S from "./RecipesNotFound.styled";

export default function RecipesNotFound({ onReset }) {
  return (
    <S.Wrapper>
      <S.Icon>🍽</S.Icon>

      <S.Title>No recipes found</S.Title>

      <S.Description>
        We couldn’t find any recipes matching your search or filters. Try
        adjusting them or create a new recipe.
      </S.Description>

      <S.Actions>
        {onReset && (
          <S.SecondaryButton onClick={onReset}>Reset filters</S.SecondaryButton>
        )}

        <S.PrimaryLink to="/recipe/create">Create recipe</S.PrimaryLink>
      </S.Actions>
    </S.Wrapper>
  );
}
