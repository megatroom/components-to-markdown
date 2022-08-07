import { ReactElement } from 'react';
import styled from 'styled-components';

/* eslint-disable-next-line */
interface ActionProps {
  /**
   * The text to display in the button.
   */
  children: React.ReactNode;
  /**
   * The text to display in the button.
   * @deprecated Use `children` instead.
   */
  text: string | ReactElement;
}

const StyledAction = styled.button`
  padding: 8px 12px;
`;

/**
 * Action button.
 *
 * @deprecated Use `Button` instead.
 */
export function Action({ text, children }: ActionProps) {
  return <StyledAction>{text || children}</StyledAction>;
}
