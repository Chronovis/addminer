#!/usr/bin/env node

import * as express from 'express';
import * as bodyParser from 'body-parser';
import addImageToApp from './image';
import addUserToApp from './user';
import addTagToApp from './tag';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

addImageToApp(app);
addUserToApp(app);
addTagToApp(app);

const port = 3999;
app.listen(port, () => console.log(`Listening on port ${port}!`));
