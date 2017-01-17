#!/usr/bin/env node

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';
import pgConnect from './pg-pool';
import { userLogin } from './user';
import { imageUpload } from './image';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const generateId = (length) => {
	length = (length != null && length > 0) ? (length-1) : 6;

	const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
	let text = chars.charAt(Math.floor(Math.random() * 52)); // Start with a letter

	// Countdown is more lightweight than for-loop
	while (length--) {
		text += chars.charAt(Math.floor(Math.random() * chars.length));
	}

	return text;
};

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'upload/');
	},
	filename: (req, file, cb) => {
		cb(null, `${generateId(32)}.${file.mimetype.split('/')[1]}`);
	}
});

const upload = multer({ storage })
app.post('/upload', upload.single('image'), async (req, res) => {
	const result = await pgConnect(imageUpload(req.file));
	console.log(result);
	res.end();
});

app.post('/login', multer().none(), async (req, res) => {
	const result = await pgConnect(userLogin(req.body));
	const authenticated = result.rowCount === 1;
	const data = { authenticated };
	if (authenticated) data.user = result.rows[0];
	res.json(data);
});

const port = 3999;
app.listen(port, () => console.log(`Listening on port ${port}!`));
