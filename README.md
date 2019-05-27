# PhotoShare
## What is it?
PhotoShare is what we call an event based photo sharing platform. We want to make it easier to share photos with other people attending the same events as you. By directly uploading the photos we make sure that memories are captured right away and available to access later on. 

## What makes it cool?
The main goal of the app is the ability for users to create and attend so called events. Every event is connected to a location which is specified with geographic coordinates. The creator of the event will provide a radius for the event which will serve as a valid zone to upload photos. The project aims to create a photo sharing platform which only allows participants that is at the same event to upload and have access to the photos taken at that event for a limited duration of time. 

## What features do we currently have?
Currently the user can:
* sign up and Login as an unique user
* create an event
* attend an event
* upload photos to this event
* ability to browse photos of previous attended events


## To run project

### `npm install`
### `npm start`

## To build project

### `npm run build`

### `serve -s build`
This creates an static server which runs on localhost:5000 and on the network
(this we can use to see the app on mobile, not having to deploy it to firebase))

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

This is what we want to do to create a production ready app.

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
