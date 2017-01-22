import Queue from '../utils/queue';

const messages = new Queue();
const initialState = {
	lastMessage: null,
	messages: messages.get(),
};

export default (state = initialState, action) => {
	let nextState = state;

	switch (action.type) {
		case 'RECEIVE_MESSAGE': {
			messages.add(action.message);
			nextState = { ...nextState, ...{
				lastMessage: messages.last(),
				messages: messages.get(),
			}};
			break;
		}

		default:
	}

	return nextState;
};
