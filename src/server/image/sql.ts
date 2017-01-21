
export const imageUpload = (file, hash) => `
	INSERT INTO image (date, hash, mimetype) VALUES (
		CURRENT_TIMESTAMP,
		'${hash}',
		'${file.mimetype}'
	) RETURNING id;
`;

export const updateImageWithOcr = (id, ocrText) => `
	UPDATE image
	SET ocr = '${ocrText}'
	WHERE id = '${id}';
`;

