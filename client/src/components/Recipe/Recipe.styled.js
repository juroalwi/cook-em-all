import styled from "styled-components";
import { colors } from "../GlobalStyle.styled";

export const Recipe = styled.div`
  @media (max-width: 360px) {
    height: 440px;
  }
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${colors.WHITE};
`;

export const Image = styled.img`
  @media (max-width: 360px) {
    min-height: 240px;
  }
  min-height: 300px;
  background-size: cover;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 16px;
`;

export const Title = styled.h1`
  color: ${colors.BLACK};
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Score = styled.div`
  position: relative;
  font-size: 16px;
  &:before {
    position: relative;
    top: 2px;
    content: "★★★★★";
    font-size: 26px;
    background: ${(props) =>
      `linear-gradient(90deg, #FBBD0D ${props.percentage}%, #2D2C2E ${props.percentage}%)`};
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

export const Diets = styled.ul`
  display: flex;
  flex-wrap: no-wrap;
  gap: 6px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none; /* Hide scrollbar in Chrome, Safari and Opera. */
    scrollbar-width: none; /* Hide in Firefox. */
    -ms-overflow-style: none; /* Hide in IE and Edge. */
  }
`;

export const Diet = styled.li`
  white-space: nowrap;
  padding: 2px 8px;
  width: auto;
  display: flex;
  font-size: 16px;
  border-radius: 20px;
  background-color: ${colors.BLACK};
  color: ${colors.WHITE};
`;

export const DetailButton = styled.button`
  height: 55px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.RED};
  color: ${colors.WHITE};
  font-size: 20px;
  letter-spacing: 0.1em;
  transition: 200ms;
  &:hover {
    background: ${colors.YELLOW};
  }
`;
