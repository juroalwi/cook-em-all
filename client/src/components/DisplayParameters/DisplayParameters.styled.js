import styled from "styled-components";
import { colors } from "../GlobalStyle.styled";

export const DisplayParameters = styled.div`
  @media (max-width: 1024px) {
    justify-content: space-evenly;
    gap: 32px;
    margin-left: 0;
  }
  display: flex;
  align-items: center;
  width: 100%;
  margin-left: 128px;
  gap: 64px;
  color: ${colors.WHITE};
`;

export const FiltersButton = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding: 12px 16px;
  transition: 200ms;
`;

export const SortButtton = styled.div`
  font-size: 20px;
  font-weight: 600;
  padding: 8px 16px;
  transition: 200ms;
`;

export const FiltersDropdown = styled.div`
  position: absolute;
  z-index: 1;
  max-width: 300px;
  width: 100%;
  display: none;
  background-color: black;
  box-shadow: 2px 4px 16px 0px rgba(45, 45, 45);
  flex-wrap: wrap;
  gap: 10px;
  padding: 16px;
`;

export const SortDropdown = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  max-width: 180px;
  display: none;
  background-color: black;
  box-shadow: 2px 4px 16px 0px rgba(45, 45, 45);
`;

export const FilterItem = styled.span`
  padding: 4px 10px;
  border-radius: 80px;
  background-color: ${(props) => (props.active ? colors.RED : colors.BLACK)};
  font-size: 16px;
  transition: 200ms;
  &:hover {
    opacity: 0.8;
  }
`;

export const SortItem = styled.p`
  padding: 12px 16px;
  color: ${(props) => (props.active ? colors.RED : colors.WHITE)};
  font-size: 16px;
  transition: 200ms;
  &:hover {
    background-color: ${colors.WHITE};
    color: ${(props) => (props.active ? colors.RED : colors.BLACK)};
  }
`;

export const FiltersSection = styled.div`
  position: "relative";
  cursor: pointer;
  &:hover ${FiltersDropdown} {
    display: flex;
  }
  &:hover ${FiltersButton} {
    opacity: 0.8;
  }
`;

export const SortSection = styled.div`
  position: "relative";
  cursor: pointer;
  &:hover ${SortDropdown} {
    display: block;
  }
  &:hover ${SortButtton} {
    box-shadow: 0px 0px 0px 0px;
    opacity: 0.8;
  }
`;
