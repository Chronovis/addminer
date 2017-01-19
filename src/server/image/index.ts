import { exec } from 'child_process';
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

const generateId = (length) => {
	length = (length != null && length > 0) ? (length - 1) : 6;

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
const upload = multer({ storage });

export default (app) =>
	app.post('/upload', upload.single('image'), async (req, res) => {
		const result = await pgConnect(imageUpload(req.file));
		const ocrText: string = await imageOcr(req.file);
		const result2 = await pgConnect(updateImageWithOcr(result.rows[0].id, ocrText.replace(`'`, `''`)));
		res.end();
	});
