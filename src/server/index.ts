#!/usr/bin/env node

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({ dest: 'upload' });
app.post('/upload', upload.single('image'), (req, res) => {
	console.log(req.file);
	res.end();
});

const port = 3999;
app.listen(port, () => console.log(`Listening on port ${port}!`));
