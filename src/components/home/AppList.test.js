import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect'
import AppList from './AppList';
import { act } from 'react-dom/test-utils';

const testUser = {
    username: "layla",
    created_on: "2022-03-16T00:25:28.097Z",
    token: "rv5aJOVOLr72YzZEXAs8"
};

test('"Enable Delete Mode" button should be NULL if user is NOT logged', async () => {
    await act(async () => {
        render(<AppList />);
        await new Promise((r) => setTimeout(r, 3000));
    });

    let deleteModeButton = null;

    try {
        deleteModeButton = await screen.findByText(/Enable Delete Mode/i)
    } catch (error) {

    }
    expect(deleteModeButton).toBeNull()
});

test('"Enable Delete Mode" button should be NOT NULL and ENABLED if user is logged', async () => {
    await act(async () => {
        render(<AppList loggedUser={testUser}/>);
        await new Promise((r) => setTimeout(r, 3000));
    });

    let deleteModeButton = null;

    try {
        deleteModeButton = await screen.findByText(/enable delete mode/i)
    } catch (error) {
        console.log(error);
    }

    expect(deleteModeButton).toBeEnabled();
});

test('Clicking "Enable Delete Mode" button should toggle to "Deletion Mode" if user is logged', async () => {
    await act(async () => {
        render(<AppList loggedUser={testUser}/>);
        await new Promise((r) => setTimeout(r, 3000));
    });

    const deleteModeButton = await screen.findByText('Enable Delete Mode');
    userEvent.click(deleteModeButton);
    const disableDeleteModeButton = await screen.findByText('Disable Delete Mode');
    expect(disableDeleteModeButton).toBeEnabled();
});

test('Clicking "Enable Delete Mode" button should display a help message if user is logged', async () => {
    await act(async () => {
        render(<AppList loggedUser={testUser}/>);
        await new Promise((r) => setTimeout(r, 3000));
    });

    const deleteModeButton = await screen.findByText('Enable Delete Mode');
    userEvent.click(deleteModeButton);
    const message = await screen.findByText('Click on any app to add it to the deletion list.');
    expect(message).toBeEnabled();
});

test('Clicking "Enable Delete Mode" button should NOT render "Delete Selected Apps" button when no app is selected', async () => {
    await act(async () => {
        render(<AppList loggedUser={testUser}/>);
        await new Promise((r) => setTimeout(r, 3000));
    });

    const deleteModeButton = await screen.findByText('Enable Delete Mode');

    userEvent.click(deleteModeButton);

    const deleteSelectedButton = screen.queryByText('Delete Selected Apps');
    expect(deleteSelectedButton).toBeNull();
});