# Getting Started with Chat App

To setup and run the project for local development / testing, you will need to use Node.js and NPM. I don't explicitly specify a minimum Node.js/NPM version for the app but I recommend going with whatever the latest LTS version is at the point in time you are setting things up. The minimum version of Node.js that I have tested this app on is 20.

Installers can be found here: https://nodejs.org/en/download

## Dependencies

Socket connection :- Socket io [https://socket.io/docs/v4/client-api/]
API :- Express JS [https://expressjs.com]
ODM :- Mongoose [https://mongoosejs.com/]

## How to run?

Open a terminal window session, or the equivalent on your machine, and enter the following command to install all the Node modules needed to run the app:

`npm i`

### Run the app in development mode

After doing an npm install enter the following npm run command: 

`npm run dev`

Runs the app in the development mode.\ [http://localhost:3100](http://localhost:3100).

Run swagger UI [http://localhost:3100/api-docs] on your browser.


### How to generate swagger build?

Run the following command to generate the build:

`npm run swagger:build`

The above command will update the swagger configuration. Refresh the page [http://localhost:3100/api-docs] to check updates.

