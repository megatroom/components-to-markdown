import { ReactNode } from 'react';
import styled, { css } from 'styled-components';

type Variant = 'default' | 'primary' | 'success' | 'danger';

export interface ButtonProps {
  /**
   * The text to display in the button.
   */
  children: ReactNode;
  /**
   * The button type.
   *
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * The button variant.
   *
   * @default 'default'
   */
  variant?: Variant;
}

interface StyledProps {
  $variant: Variant;
}

const variants: Record<Variant, any> = {
  default: css`
    background-color: #fff;
    border-color: #ccc;
  `,
  primary: css`
    color: #fff;
    background-color: #337ab7;
    border-color: #2e6da4;
  `,
  success: css`
    color: #fff;
    background-color: #5cb85c;
    border-color: #4cae4c;
  `,
  danger: css`
    color: #fff;
    background-color: #d9534f;
    border-color: #d43f3a;
  `,
};

const StyledButton = styled.button`
  padding: 6px 12px;
  color: #212121;
  border: 1px solid transparent;
  font-weight: 400;
  color: #fff;

  ${({ $variant }: StyledProps) => variants[$variant]}
`;

export function Button({
  children,
  type = 'button',
  variant = 'default',
}: ButtonProps) {
  return (
    <StyledButton type={type} $variant={variant}>
      {children}
    </StyledButton>
  );
}
