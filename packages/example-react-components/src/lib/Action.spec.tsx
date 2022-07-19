import { render } from '@testing-library/react';

import Action from './Action';

describe('Action', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Action />);
    expect(baseElement).toBeTruthy();
  });
});
