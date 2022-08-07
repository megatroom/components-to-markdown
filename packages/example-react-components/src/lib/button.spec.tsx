import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { Button } from './Button';

describe('Button', () => {
  it('should render children', () => {
    render(<Button>My Text</Button>);
    expect(screen.getByText('My Text')).toBeInTheDocument();
  });
});
