import styled from "styled-components";

export const Recipes = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 32px;
`;

export const Container = styled.div`
  @media (max-width: 1024px) {
    padding: 16px;
  }
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 32px;
  padding: 32px;
  height: 100%;
`;

export const Top = styled.div`
  @media (max-width: 1024px) {
    padding-left: 0px;
  }
  padding-left: 128px;
  width: 100%;
`;

export const Bottom = styled.div`
  margin-top: auto;
  display: flex;
  justify-content: center;
`;
