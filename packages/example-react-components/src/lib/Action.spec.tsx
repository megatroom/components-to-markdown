import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Action } from './Action';

describe('Action', () => {
  it('should render children', () => {
    render(<Action>My Text</Action>);
    expect(screen.getByText('My Text')).toBeInTheDocument();
  });
});
