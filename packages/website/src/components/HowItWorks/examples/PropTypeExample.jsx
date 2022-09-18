import React from 'react';
import PropTypes from 'prop-types';

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
export function Button({ children, onClick, type }) {
  return (
    <button type={type} onClick={onClick}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  type: 'button',
  variant: 'default',
};

Button.propTypes = {
  /**
   * The text to display in the button.
   */
  children: PropTypes.node.isRequired,
  /**
   * The button type.
   */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /**
   * The button variant.
   *
   * @since 1.1.0
   */
  variant: PropTypes.oneOf(['default', 'primary', 'success', 'danger']),
  /**
   * Button click event handler.
   *
   * @example Logging the click event
   * ```jsx
   * onClick={() => {
   *  console.log('Button clicked');
   * }}
   * ```
   *
   * @param event The click event.
   * @returns void
   */
  onClick: PropTypes.func,
};
