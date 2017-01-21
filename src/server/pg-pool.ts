import * as pg from 'pg';

const pgPool = new pg.Pool({
	database: 'addminer',
	idleTimeoutMillis: 3000,
	max: 10,
	password: 'docker',
	port: 5432,
	user: 'docker',
});

export default (sql) => new Promise((resolve, reject) =>
	pgPool.connect((connectionError, client, releaseClient) => {
		console.log('sql', sql);
		if (connectionError) {
			reject(connectionError);
			// return console.error('Error fetching client from pool', connectionError);
		}

		client.query(sql, (queryError, result) => {
			if (queryError) {
				reject(queryError);
				// return console.error('Error querying database', queryError);
			}

			resolve(result);
			releaseClient();
		});
	})
);
