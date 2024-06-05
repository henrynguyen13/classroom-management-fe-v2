import React from "react";

import styled from "styled-components";

import { EllipseBox } from "./EllipseBox";

interface IProps {
  label?: string;
  backgroundColor?: string;
  dotColor?: string;
}

export const AppStatus: React.FC<IProps> = (props) => {
  const { label, backgroundColor, dotColor } = props;

  return (
    <ContainerStyled $bgColor={backgroundColor} className="app-status-tag">
      <EllipseBox $color={dotColor} />
      <span className="status-text capitalize-ft">{label}</span>
    </ContainerStyled>
  );
};

const ContainerStyled = styled.div<{ $bgColor?: string }>`
  display: inline-flex;
  width: fit-content;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 4px 10px;
  border-radius: 4px;
  background-color: ${({ $bgColor }) => $bgColor};

  & > .status-text {
    white-space: nowrap;
    font-weight: 500;
    font-size: 16[x];
  }
`;
