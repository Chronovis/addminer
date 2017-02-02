import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import * as multer from 'multer';
import { selectLatestImages } from '../image/sql';
import { userLogin } from './sql';
import pgConnect from '../pg-pool';

export default (app) =>
	app.post('/login', multer().none(), async (req, res) => {
		const result: any = await pgConnect(userLogin(req.body));
		const { hash, id } = result.rows[0];
		const authenticated = await bcrypt.compare(req.body.password, hash);
		if (authenticated) {
			const result2: any = await pgConnect(selectLatestImages(id));
			const token = jwt.sign({ userId: id }, 'secret');
			res.set('Authorization', `Bearer ${token}`);
			res.json({
				latestUploads: result2.rows,
				message: {
					type: 'success',
					value: 'Login successful',
				},
			});
		} else {
			res.status(401).json({
				message: {
					type: 'error',
					value: 'Unauthorized',
				}
			});
		}
	});
