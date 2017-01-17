export const userLogin = ({ email_address, password }) => `
	SELECT "user".id 
	FROM "user"
	WHERE "user".email_address = '${email_address}'
		AND "user".password = '${password}';
`;
