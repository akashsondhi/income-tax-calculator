# Getting Started with Income Tax Calculator

This is a minimalist application that takes input Annual Income and Tax Year and outputs the Income Tax owing.

It's relying on a mock backend service deployed as a docker image.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Pre-requisite

### Node version
Preferred version >= 10.14
Update node version before setting up the application.

### Backend Service
Make sure before deploying this project, you have installed docker image needed for the mock backend service. 

Steps:
1. Start Docker service on your machine
2. In your terminal, execute the following commands
`docker pull ptsdocker16/interview-test-server`
`docker run --init -p 5000:5000 -it ptsdocker16/interview-test-server`
3. Verify the backend is ready by visiting `http://localhost:5000/tax-calculator/brackets`

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs the dependencies needed to run the application.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


### `npx cypress open`

It opens an interactive window to execute cypress tests for UI E2E testing.
Should be run in a separate terminal, and should have both backend and frontend deployed.

Click on Dashboard.spec.js to run the integration test for the application.

Note: Change the port in `baseUrl` inside cypress.json file to point to your local frontend deployment's port.