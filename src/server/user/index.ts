import * as bcrypt from 'bcrypt';
import * as multer from 'multer';
import pgConnect from '../pg-pool';
import { userLogin } from './sql';

export default (app) =>
	app.post('/login', multer().none(), async (req, res) => {
		const result: any = await pgConnect(userLogin(req.body));
		const authenticated = await bcrypt.compare(req.body.password, result.rows[0].hash);
		const data = { authenticated };
		res.json(data);
	});
