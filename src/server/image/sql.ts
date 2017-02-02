export const insertImage = (file, hash) => `
	INSERT INTO image (upload_date, hash, mimetype) VALUES (
		CURRENT_TIMESTAMP,
		'${hash}',
		'${file.mimetype}'
	) RETURNING id;
`;

export const insertImageUserRelation = (imageId, userId) => `
	INSERT INTO image__user (image_id, user_id, creation_date) VALUES (
		'${imageId}',
		'${userId}',
		CURRENT_TIMESTAMP
	);
`;

export const updateImageWithOcr = (id, ocrText) => `
	UPDATE image
	SET ocr = '${ocrText}'
	WHERE id = '${id}';
`;

export const selectLatestImages = (userId) => `
	SELECT image.*
	FROM image, image__user
	WHERE image__user.user_id = '${userId}' 
		AND image__user.image_id = image.id
	ORDER BY image__user.creation_date DESC
	LIMIT 6;
`;
