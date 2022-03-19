import { render, screen } from '@testing-library/react';
import NavBar from './NavBar';
import { BrowserRouter as Router } from 'react-router-dom';
import TestUtils from '../../util/TestUtils';

const testUser = TestUtils.testUser;

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