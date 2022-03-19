# Apps Frontend

- This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

- This project is meant to work along with [Apps Backend](https://github.com/sceballos/apps-backend) project. Please refer first to this page before setting up this project.

## Prerequisites

- npm (Node Package Manager)
- ReactJS

## How to run this project
1 - Clone this repository :  `git clone https://github.com/sceballos/apps-frontend.git` and `cd apps-frontend`.

2 - Open `/src/repository/api/API.js` and edit the server info :

```js
const serverInfo = {
    host: "localhost",
    port: "5880"
};
```
Make sure the host and port matches your [Apps Backend](https://github.com/sceballos/apps-backend) target server. If your setup for the bakend was the default one, didn't change `DB_PORT` and you are running it locally you can leave `const serverInfo` as it is.

3 - run `npm install` to install all dependencies.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Running UI test cases

- Make sure you run `npm start` and your development server is running before running test cases.
- After your backend is running and properly configured you can just run `npm test` and press `A` when prompted while in the interactive terminal.