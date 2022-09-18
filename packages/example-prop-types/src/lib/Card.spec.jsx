import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import Card, { CardBody, CardMedia, CardMediaDescription } from './Card';

describe('Card', () => {
  it('should render with body', () => {
    render(
      <Card>
        <CardBody>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </CardBody>
      </Card>
    );
    expect(
      screen.getByText(
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'
      )
    ).toBeInTheDocument();
  });

  it('should render with media', () => {
    render(
      <Card>
        <CardMedia>
          <CardMediaDescription>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          </CardMediaDescription>
        </CardMedia>
      </Card>
    );
    expect(
      screen.getByText(
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit.'
      )
    ).toBeInTheDocument();
  });
});
