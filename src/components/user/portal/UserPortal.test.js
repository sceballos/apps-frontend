import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import UserPortal from './UserPortal';
import { act } from 'react-dom/test-utils';

const testUser = {
    username: "layla",
    password: "password1",
    created_on: "2022-03-16T00:25:28.097Z",
    token: "rv5aJOVOLr72YzZEXAs8"
};

test('Default state after first render of login button should be disabled', () => {
    render(<UserPortal />);
    const loginButton = screen.queryByText('Login');
    expect(loginButton).toBeDisabled();
});

test('State after typing username and password of "login" button should be enabled', () => {
    render(<UserPortal />);
    userEvent.type(screen.queryByPlaceholderText('Username'), testUser.username);
    userEvent.type(screen.queryByPlaceholderText('Password'), testUser.password);
    const loginButton = screen.queryByText('Login');
    expect(loginButton).toBeEnabled();
});

test('Pressing "Register new user" button should change the label of Login button to Sign Up', () => {
    render(<UserPortal />);
    userEvent.click(screen.queryByText('Register new user'));
    const signUpButton = screen.queryByText('Sign up');
    expect(signUpButton).not.toBeNull();
});

test('State after typing username and password of "sign up" button should be enabled', () => {
    render(<UserPortal />);
    userEvent.click(screen.queryByText('Register new user'));
    userEvent.type(screen.queryByPlaceholderText('Username'), testUser.username);
    userEvent.type(screen.queryByPlaceholderText('Password'), testUser.password);
    const signUpButton = screen.queryByText('Sign up');
    expect(signUpButton).toBeEnabled();
});


test('An error of incorrect credentials should be displayed on failed login', async () => {
    render(<UserPortal />);
    userEvent.type(screen.queryByPlaceholderText('Username'), testUser.username);
    userEvent.type(screen.queryByPlaceholderText('Password'), "fakepassword");


    await act(async () => {
        userEvent.click(screen.queryByText('Login'));
        await new Promise((r) => setTimeout(r, 2500));
    });

    const errorMessage = await screen.findByText('Username or password is incorrect.');
    expect(errorMessage).not.toBeNull();
});



