import styled from "styled-components";
import { colors } from "../GlobalStyle.styled";

export const NavBar = styled.nav`
  @media (max-width: 1024px) {
    background-color: transparent;
    flex-direction: column-reverse;
    padding: 4px 16px;
    gap: 16px;
  }
  background-color: ${colors.BLACK};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 32px;
  gap: 64px;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  gap: 32px;
`;

export const LogoContainer = styled.div`
  @media (max-width: 1024px) {
    display: none;
  }
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

export const Title = styled.div`
  color: ${colors.WHITE};
  font-size: 24px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const Image = styled.img`
  height: 70px;
  filter: invert(0.8);
  cursor: pointer;
`;

export const Button = styled.p`
  @media (max-width: 1024px) {
    font-size: 18px;
  }
  cursor: pointer;
  color: ${colors.WHITE};
  font-size: 20px;
  font-weight: 600;
  transition: 100ms;
  &:hover {
    opacity: 0.8;
  }
`;
