const initialState = {
	authenticated: false,
	user: null,
};

export default (state = initialState, action) => {
	let nextState = state;

	switch (action.type) {
		case 'USER_LOGIN': {
			nextState = { ...nextState, ...{
				authenticated: action.authenticated,
			}};
			break;
		}

		case 'USER_LOGOUT': {
			nextState = { ...nextState, ...{
			}};
			break;
		}

		default:
	}

	return nextState;
};
