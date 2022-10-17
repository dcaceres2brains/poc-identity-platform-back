import dotenv from 'dotenv';
import express from 'express';
import * as bodyParser from 'body-parser';

const cors = require('cors')

import * as authService from "./services/AuthService";

// load the environment variables from the .env file
dotenv.config({
  path: '.env'
});

/**
 * Express server application class.
 * @description Will later contain the routing system.
 */
const app = express();
app.use(cors())
const port = process.env.PORT || 5000;

const jsonParser = bodyParser.json()

app.listen(port, () => console.log(`> Listening on port ${port}`));


app.get("/user/:uid", authService.getUser);
app.patch("/user/:uid", jsonParser, authService.updateUser);
app.delete("/user/:uid", authService.deleteUser);
app.post("/user", jsonParser, authService.createUser);
