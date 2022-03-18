import { render, screen } from '@testing-library/react';
import App from './App';

it('Renders without crashing', () => {
  const app = render(<App />);
  const mainBar = screen.queryByTestId("main-app-container");
  expect(mainBar).toBeInTheDocument();
});
