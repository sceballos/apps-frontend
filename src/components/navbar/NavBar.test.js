import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NavBar from './NavBar';
import { BrowserRouter as Router } from 'react-router-dom';

const testUser = {
    username: "layla",
    created_on: "2022-03-16T00:25:28.097Z",
    token: "rv5aJOVOLr72YzZEXAs8"
};

test('Home button menu should be enabled when user is not logged in', async () => {
    render(<Router><NavBar /></Router>);
    const homeButton = screen.queryByText('Home');
    expect(homeButton).toBeEnabled();
});

test('Home button menu should be enabled when user is logged in', async () => {
    render(<Router><NavBar loggedUser={testUser}/></Router>);
    const homeButton = screen.queryByText('Home');
    expect(homeButton).toBeEnabled();
});

test('Login button menu should be enabled when user is not logged in', async () => {
    render(<Router><NavBar /></Router>);
    const loginButton = screen.queryByText('Login');
    expect(loginButton).toBeEnabled();
});

test('Login button menu should not render when user is logged in', async () => {
    render(<Router><NavBar loggedUser={testUser} /></Router>);
    const loginButton = screen.queryByText('Login');
    expect(loginButton).toBeNull();
});

test('Logout button menu should be enabled when user is logged in', async () => {
    render(<Router><NavBar loggedUser={testUser} /></Router>);
    const loginButton = screen.queryByText('Logout');
    expect(loginButton).toBeEnabled();
});

test('Add App button menu should be enabled when user is logged in', async () => {
    render(<Router><NavBar loggedUser={testUser} /></Router>);
    const addButton = screen.queryByText('Add App');
    expect(addButton).toBeEnabled();
});

test('Hello message should be enabled when user is logged in', async () => {
    render(<Router><NavBar loggedUser={testUser} /></Router>);
    const helloMessage = screen.queryByText(`Hello ${testUser.username}`);
    expect(helloMessage).toBeEnabled();
});