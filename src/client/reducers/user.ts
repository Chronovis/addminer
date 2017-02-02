const initialState = {
	latestUploads: [],
	token: null,
};

export default (state = initialState, action) => {
	let nextState = state;

	switch (action.type) {
		case 'USER_LOGIN': {
			nextState = { ...nextState, ...{
				token: action.token,
			}};
			break;
		}

		case 'USER_LOGOUT': {
			nextState = initialState;
			break;
		}

		default:
	}

	return nextState;
};
