import { render, screen } from '@testing-library/react';
import App from './App';

test('UI - app render', () => {
  render(<App />);

  const headerText = screen.getByText(/Encryption Tool/i);

  expect(headerText).toBeInTheDocument();
});