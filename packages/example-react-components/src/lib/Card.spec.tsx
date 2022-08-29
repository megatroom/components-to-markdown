import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Card, { CardBody } from './Card';

describe('Card', () => {
  it('should render children', () => {
    render(<Card>My Text</Card>);
    expect(screen.getByText('My Text')).toBeInTheDocument();
  });
});

describe('CardBody', () => {
  it('should render children', () => {
    render(<CardBody>My Text</CardBody>);
    expect(screen.getByText('My Text')).toBeInTheDocument();
  });
});
