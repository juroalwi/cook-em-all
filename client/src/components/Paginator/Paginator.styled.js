import styled from "styled-components";
import { colors } from "../GlobalStyle.styled";

export const Paginator = styled.div`
  background-color: transparent;
`;

export const Button = styled.button`
  height: 56px;
  width: 56px;
  font-size: 20px;
  font-weight: 600;
  background-color: transparent;
  color: ${colors.WHITE};
  transition: background-color 300ms;
  &:hover {
    background-color: #222;
  }
`;

export const MobileContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`;

export const CurrentPage = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.WHITE};
`;

export const Arrow = styled.div`
  transition: background-color 300ms;
  &:hover {
    background-color: #222;
  }
`;
