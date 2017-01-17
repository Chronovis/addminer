export const imageUpload = ({ date, filename, mimetype }) => `
	INSERT INTO image (date, filename, mimetype) VALUES (
		CURRENT_TIMESTAMP,
		'${filename}',
		'${mimetype}'
	);
`;
