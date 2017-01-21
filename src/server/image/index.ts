import { exec } from 'child_process';
import * as fs from 'fs';
import * as md5File from 'md5-file/promise';
import * as multer from 'multer';
import pgConnect from '../pg-pool';
import { imageUpload, updateImageWithOcr } from './sql';

const imageOcr = (file) => new Promise((resolve, reject) => {
	const command = `docker run -i --rm -v ~/IdeaProjects/addminer/upload:/upload gijsjan/tesseract:1.0 tesseract /${file.path} stdout`;
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
			const hash = await md5File(req.file.path);
			const filename = `${hash}.${req.file.mimetype.split('/')[1]}`;
			fs.renameSync(req.file.path, `${dest}filename`);

			let result;
			try {
				result = await pgConnect(imageUpload(req.file, hash));
			} catch (error) {
				const message = { type: 'error', httpCode: 422, value: '' };
				if (error.code === '23505') {
					message.httpCode = 409;
					message.value = 'Duplicate entry';
				}
				res.status(message.httpCode).json(message);
			}

			// const ocrText: string = await imageOcr(req.file);
			// const result2 = await pgConnect(updateImageWithOcr(result.rows[0].id, ocrText.replace(`'`, `''`)));
			res.end();

		}
	);
}
