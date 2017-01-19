export const userLogin = ({ email_address, password }) => `
	SELECT "user".hash 
	FROM "user"
	WHERE "user".email_address = '${email_address}'
`;
