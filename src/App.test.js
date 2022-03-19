import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import { act } from 'react-dom/test-utils';
import TestUtils from './util/TestUtils';

const testUser = TestUtils.testUser;
const apiResponseWaitTime = TestUtils.apiResponseWaitTime;

test('Initial state has main navbar with app name', () => {
  render(<App />);
  const mainBarTitle = screen.queryByText('<Apps Manager/>');
  expect(mainBarTitle).not.toBeNull();
});

test('"Enable Delete Mode" button is not available by default', async () => {
  await act(async () => {
    render(<App />);
    await new Promise((r) => setTimeout(r, apiResponseWaitTime));
  });

  const deleteModeButton = screen.queryByText('Enable Delete Mode');
  expect(deleteModeButton).toBeNull();
});

test('Login flow and check if "Enable Delete Mode" exists', async () => {

  render(<App />);
  const login = await screen.findByText('Login');
  userEvent.click(login);

  userEvent.type(screen.queryByPlaceholderText('Username'), testUser.username);
  userEvent.type(screen.queryByPlaceholderText('Password'), testUser.password);

  await act(async () => {
    userEvent.click(await screen.findByTestId("portal-submit"));
    await new Promise((r) => setTimeout(r, apiResponseWaitTime));
  });

  const deleteModeButton = await screen.findByText('Enable Delete Mode');
  expect(deleteModeButton).not.toBeNull();
});


test('Login flow and check if "Add App" exists', async () => {
  render(<App />);

  const login = await screen.findByText('Login');
  userEvent.click(login);

  userEvent.type(screen.queryByPlaceholderText('Username'), testUser.username);
  userEvent.type(screen.queryByPlaceholderText('Password'), testUser.password);

  await act(async () => {
    userEvent.click(await screen.findByTestId("portal-submit"));
    await new Promise((r) => setTimeout(r, apiResponseWaitTime));
  });

  const addAppButton = await screen.findByText('Add App');
  expect(addAppButton).not.toBeNull();
});

test('Login flow and check if "Logout" exists', async () => {
  render(<App />);

  const login = await screen.findByText('Login');
  userEvent.click(login);

  userEvent.type(screen.queryByPlaceholderText('Username'), testUser.username);
  userEvent.type(screen.queryByPlaceholderText('Password'), testUser.password);

  await act(async () => {
    userEvent.click(await screen.findByTestId("portal-submit"));
    await new Promise((r) => setTimeout(r, apiResponseWaitTime));
  });

  const logoutButton = await screen.findByText('Logout');
  expect(logoutButton).not.toBeNull();
});