#!/usr/bin/env node

import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as multer from 'multer';
import pgPool from './pg-pool';
import { userLogin } from './user';

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({ dest: 'upload' });
app.post('/upload', upload.single('image'), (req, res) => {
	console.log(req.file);
	res.end();
});

app.post('/login', upload.none(), (req, res) => {
	pgPool.connect((connectionError, client, releaseClient) => {
		if (connectionError) return console.error('Error fetching client from pool', connectionError);

		const sql = userLogin(req.body);
		client.query(sql, (queryError, result) => {
			if (queryError) return console.error('Error querying database', queryError);
			const authenticated = result.rowCount === 1;
			const data = { authenticated };
			if (authenticated) data.user = result.rows[0];
			res.json(data);
			releaseClient();
		});
	});
});

const port = 3999;
app.listen(port, () => console.log(`Listening on port ${port}!`));
