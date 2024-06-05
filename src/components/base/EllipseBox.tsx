import styled, { css } from "styled-components";

interface IProps {
  $size?: number;
  $color?: string;
  $borderColor?: string;
  $border?: number;
  $disabled?: boolean;
  $checked?: boolean;
}

export const EllipseBox = styled.span<IProps>`
  width: ${({ $size }) => $size || 8}px;
  height: ${({ $size }) => $size || 8}px;
  background-color: ${({ $color }) => $color};
  ${({ $border, $borderColor }) =>
    $border &&
    css`
      border-width: ${$border}px;
      border-style: solid;
      border-color: ${$borderColor || "transparent"};
    `};
  /* ${({ $disabled, $checked }) =>
    !$checked &&
    $disabled &&
    css`
      background-color: ${({ theme }) => theme.neutral200};
    `}; */
  border-radius: 50%;
`;
