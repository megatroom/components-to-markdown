import React, { ReactNode } from 'react';

type Variant = 'default' | 'primary' | 'success' | 'danger';

export interface ButtonProps {
  /**
   * The text to display in the button.
   */
  children: ReactNode;
  /**
   * The button type.
   *
   * @defaultValue `'button'`
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * The button variant.
   *
   * @since 1.1.0
   * @defaultValue `'default'`
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

/**
 * Buttons allow users to take actions, and make choices, with a single tap.
 *
 * @remarks
 * Buttons communicate actions that users can take.
 * They are typically placed throughout your UI, in places like:
 * - Dialogs
 * - Modal windows
 * - Forms
 * - Cards
 * -Toolbars
 *
 * @beta
 * @public
 */
export function Button({ children, onClick, type = 'button' }: ButtonProps) {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
}
