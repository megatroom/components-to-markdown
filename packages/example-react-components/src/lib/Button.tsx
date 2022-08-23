import React, { ReactNode } from 'react';
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
   * @defaultValue 'button'
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * The button variant.
   *
   * @defaultValue 'default'
   */
  variant?: Variant;
  /**
   * Button click event handler.
   *
   * @example Logging the click event
   * ```tsx
   * onClick={() => {
   *  console.log('Button clicked');
   * }}
   * ```
   *
   * @param event The click event.
   * @returns void
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
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

/**
 * Buttons allow users to take actions, and make choices, with a single tap.
 *
 * @remarks
 * Buttons communicate actions that users can take. They are typically placed throughout your UI, in places like:
 * - Dialogs
 * - Modal windows
 * - Forms
 * - Cards
 * -Toolbars
 *
 * @beta
 * @public
 */
export function Button({
  children,
  onClick,
  type = 'button',
  variant = 'default',
}: ButtonProps) {
  return (
    <StyledButton type={type} $variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  );
}
