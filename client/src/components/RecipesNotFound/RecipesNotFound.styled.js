import styled from "styled-components";
import { Link } from "react-router-dom";
import { colors } from "../GlobalStyle.styled";

export const Wrapper = styled.div`
  max-width: 420px;
  padding: 48px 40px;
  margin: 80px auto 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 18px;
  background: ${colors.WHITE}06;
  border: 1px solid ${colors.WHITE}10;
  border-radius: 6px;
`;

export const Icon = styled.div`
  width: 72px;
  height: 72px;
  border-radius: 50%;
  border: 1px solid ${colors.WHITE}20;
  background: rgba(0, 0, 0, 0.4);
  font-size: 44px;
  line-height: 1.6;
  color: ${colors.WHITE};
`;

export const Title = styled.h2`
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 0.04em;
  color: ${colors.WHITE};
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 1.6;
  color: ${colors.WHITE}A0;
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 10px;
`;

export const SecondaryButton = styled.button`
  padding: 10px 18px;
  background: ${colors.BLACK};
  border: 1px solid ${colors.WHITE}20;
  border-radius: 4px;
  font-size: 14px;
  color: ${colors.WHITE};
  transition-duration: 200ms;
  &:hover {
    opacity: 0.8;
  }
`;

export const PrimaryLink = styled(Link)`
  padding: 10px 18px;
  background: ${colors.RED};
  border-radius: 4px;
  font-size: 14px;
  color: #FFF;
  transition-duration: 200ms;
  &:hover {
    opacity: 0.8;
  }
`;
