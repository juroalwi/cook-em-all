import styled from "styled-components";
import { colors } from "../GlobalStyle.styled";

export const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 64px;
  color: ${colors.WHITE};
`;

export const FiltersButton = styled.div`
  @media (max-width: 400px) {
    padding: 8px 16px;
    font-size: 16px;
  }
  width: 240px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  transition: 200ms;
  padding: 12px 48px;
  box-shadow: 1px 2px 8px 0px rgba(45, 45, 45);
`;

export const SortButtton = styled.div`
  @media (max-width: 400px) {
    padding: 8px 16px;
    font-size: 16px;
  }
  width: 240px;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  transition: 200ms;
  padding: 12px 48px;
  box-shadow: 1px 2px 8px 0px rgba(45, 45, 45);
`;

export const FiltersDropdown = styled.div`
  position: absolute;
  z-index: 1;
  width: 400px;
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
  font-size: 20px;
  letter-spacing: 1px;
  transition: 200ms;
  &:hover {
    background-color: ${colors.WHITE};
    color: ${(props) => (props.active ? colors.RED : colors.BLACK)};
  }
`;

export const FiltersSection = styled.div`
  position: relative;
  cursor: pointer;
  &:hover ${FiltersDropdown} {
    display: flex;
  }
  &:hover ${FiltersButton} {
    opacity: 0.8;
    box-shadow: 0px 0px 0px 0px;
  }
`;

export const SortSection = styled.div`
  position: relative;
  cursor: pointer;
  &:hover ${SortDropdown} {
    display: block;
  }
  &:hover ${SortButtton} {
    opacity: 0.8;
    box-shadow: 0px 0px 0px 0px;
  }
`;

export const MobileContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  color: ${colors.WHITE};
`;

export const MobileDropdownButton = styled.button`
  background-color: transparent;
  margin-left: auto;
  width: fit-content;
`;

export const MobileDropdown = styled.div`
  position: absolute;
  z-index: 1;
  top: 120%;
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 16px;
  box-shadow: 2px 4px 16px 0px rgba(45, 45, 45);
  background-color: black;
`;

export const MobileDropdownTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
`;

export const MobileSortByContainer = styled.div`
  display: flex;
  padding: 8px;
  gap: 16px;
  cursor: pointer;
`;

export const MobileSortByItem = styled.div`
  font-size: 18px;
  color: ${(props) => (props.active ? colors.RED : colors.WHITE)};
`;

export const MobileFiltersContainer = styled.div`
  display: flex;
  padding: 8px;
  gap: 8px;
  flex-wrap: wrap;
  cursor: pointer;
`;

export const MobileFilterItem = styled.div`
  padding: 4px 10px;
  border-radius: 80px;
  background-color: ${(props) => (props.active ? colors.RED : colors.BLACK)};
  font-size: 14px;
  white-space: nowrap;
`;
