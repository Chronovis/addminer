export const imageUpload = ({ date, filename, mimetype }) => `
	INSERT INTO image (date, filename, mimetype) VALUES (
		CURRENT_TIMESTAMP,
		'${filename}',
		'${mimetype}'
	) RETURNING id;
`;

export const updateImageWithOcr = (id, ocrText) => `
	UPDATE image
	SET ocr = '${ocrText}'
	WHERE id = '${id}';
`;

