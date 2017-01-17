import * as pg from 'pg';

export default new pg.Pool({
	database: 'addminer',
	idleTimeoutMillis: 3000,
	max: 10,
	password: 'docker',
	port: 5432,
	user: 'docker',
});
