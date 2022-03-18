import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

const testUser = {
  username: "layla",
  password: "password1",
  created_on: "2022-03-16T00:25:28.097Z",
  token: "rv5aJOVOLr72YzZEXAs8"
};

test('Initial state has main navbar with app name', () => {
  render(<App />);
  const mainBarTitle = screen.queryByText('<Apps Manager/>');
  expect(mainBarTitle).not.toBeNull();
});


test('"Enable Delete Mode" button is not available by default', () => {
  render(<App />);
  const deleteModeButton = screen.queryByText('Enable Delete Mode');
  expect(deleteModeButton).toBeNull();
});

test('Login flow and check if "Enable Delete Mode" exists', async ()  => {
  render(<App />);

  const login = await screen.findByText('Login');
  userEvent.click(login);

  userEvent.type(screen.queryByPlaceholderText('Username'), testUser.username);
  userEvent.type(screen.queryByPlaceholderText('Password'), testUser.password);

  userEvent.click(await screen.findByTestId("portal-submit"));

  const deleteModeButton = await screen.findByText('Enable Delete Mode');
  expect(deleteModeButton).not.toBeNull();
});


test('Login flow and check if "Add App" exists', async ()  => {
  render(<App />);

  const login = await screen.findByText('Login');
  userEvent.click(login);

  userEvent.type(screen.queryByPlaceholderText('Username'), testUser.username);
  userEvent.type(screen.queryByPlaceholderText('Password'), testUser.password);

  userEvent.click(await screen.findByTestId("portal-submit"));

  const addAppButton = await screen.findByText('Add App');
  expect(addAppButton).not.toBeNull();
});

test('Login flow and check if "Logout" exists', async ()  => {
  render(<App />);

  const login = await screen.findByText('Login');
  userEvent.click(login);

  userEvent.type(screen.queryByPlaceholderText('Username'), testUser.username);
  userEvent.type(screen.queryByPlaceholderText('Password'), testUser.password);

  userEvent.click(await screen.findByTestId("portal-submit"));

  const logoutButton = await screen.findByText('Logout');
  expect(logoutButton).not.toBeNull();
});