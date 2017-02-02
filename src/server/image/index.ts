import { exec } from 'child_process';
import * as fs from 'fs';
import * as md5File from 'md5-file/promise';
import * as multer from 'multer';
import * as jwt from 'jsonwebtoken';
import pgConnect from '../pg-pool';
import {insertImage, updateImageWithOcr, insertImageUserRelation} from './sql';
import { IMessage } from '../../interfaces';

const imageOcr = (filePath) => new Promise((resolve, reject) => {
	const command = `docker run -i --rm -v ~/IdeaProjects/addminer/upload:/upload gijsjan/tesseract:1.0 tesseract /${filePath} stdout`;
	exec(command, (error, stdout: string /*, stderr */) => {
		if (error != null) return reject(error);
		resolve(stdout);
	});
});

export default (app) => {
	const dest = 'upload/';
	const upload = multer({ dest });

	app.post(
		'/upload',
		upload.single('image'),
		async (req, res) => {
			const token = req.get('Authorization').replace('Bearer ', '');
			const decodedJwt = jwt.verify(token, 'secret');

			const hash = await md5File(req.file.path);
			const filename = `${hash}.${req.file.mimetype.split('/')[1]}`;
			const newFilePath = `${dest}${filename}`;
			fs.renameSync(req.file.path, newFilePath);

			let result;

			try {
				result = await pgConnect(insertImage(req.file, hash));
			} catch (error) {
				const message: IMessage = { type: 'error', value: '' };
				if (error.code === '23505') {
					message.value = 'Duplicate image.';
					res.status(409).json(message);
				} else {
					res.status(400).json({ value: 'Error inserting image.' });
				}
				return;
			}

			try {
				await pgConnect(insertImageUserRelation(result['rows'][0]['id'], decodedJwt.userId));
			} catch (error) {
				res.status(400).json({ value: 'Error inserting image - user relation.' });
				return;
			}

			// const ocrText: string = await imageOcr(newFilePath);
			// console.log(ocrText)
			// const result2 = await pgConnect(updateImageWithOcr(result.rows[0].id, ocrText.replace(`'`, `''`)));

			res.status(200).json({
				type: 'success',
				value: 'Image uploaded',
			});

		}
	);
}
