export const autocompleteTag = (q) => `
	SELECT json_agg(json_build_object(
		'key', tag.id,
		'value', tag.name
	)) AS tags
	FROM tag
	WHERE tag.name LIKE '%' || '${q}' || '%';
`;
