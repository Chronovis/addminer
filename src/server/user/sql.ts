export const userLogin = ({ email_address, password }) => `
	SELECT "user".hash, "user".id 
	FROM "user"
	WHERE "user".email_address = '${email_address}'
`;
