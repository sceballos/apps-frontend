import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AppList from './AppList';

const testUser = {
    username: "layla",
    created_on: "2022-03-16T00:25:28.097Z",
    token: "rv5aJOVOLr72YzZEXAs8"
};

test('"Enable Delete Mode" button should be NULL if user is NOT logged', () => {
    render(<AppList />);
    const deleteModeButton = screen.queryByText('Enable Delete Mode');
    expect(deleteModeButton).toBeNull();
});

test('"Enable Delete Mode" button should be NOT NULL and ENABLED if user is logged', () => {
    render(<AppList loggedUser={testUser} />);
    const deleteModeButton = screen.queryByText('Enable Delete Mode');
    expect(deleteModeButton).toBeEnabled();
});

test('Clicking "Enable Delete Mode" button should toggle to "Deletion Mode" if user is logged', () => {
    render(<AppList loggedUser={testUser} />);
    const deleteModeButton = screen.queryByText('Enable Delete Mode');
    userEvent.click(deleteModeButton);
    const disableDeleteModeButton = screen.queryByText('Disable Delete Mode');
    expect(disableDeleteModeButton).toBeEnabled();
});

test('Clicking "Enable Delete Mode" button should display a help message if user is logged', () => {
    render(<AppList loggedUser={testUser} />);
    const deleteModeButton = screen.queryByText('Enable Delete Mode');
    userEvent.click(deleteModeButton);
    const message = screen.queryByText('Click on any app to add it to the deletion list.');
    expect(message).toBeEnabled();
});

test('Clicking "Enable Delete Mode" button should NOT render "Delete Selected Apps" button when no app is selected', () => {
    render(<AppList loggedUser={testUser} />);
    const deleteModeButton = screen.queryByText('Enable Delete Mode');
    userEvent.click(deleteModeButton);
    const deleteSelectedButton = screen.queryByText('Delete Selected Apps');
    expect(deleteSelectedButton).toBeNull();
});