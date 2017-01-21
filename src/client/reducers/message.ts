class Queue {
	public elements = [];

	public add(element) {
		if (this.elements.length > 9) {
			this.elements = this.elements.slice(1);
		}
		this.elements = this.elements.concat(element);
	}

	public last() {
		return this.elements[this.elements.length - 1];
	}
}

const messages = new Queue();
const initialState = {
	lastMessage: null,
	messages: messages.elements,
};

export default (state = initialState, action) => {
	let nextState = state;

	switch (action.type) {
		case 'RECEIVE_MESSAGE': {
			messages.add(action.message);
			nextState = { ...nextState, ...{
				lastMessage: messages.last(),
				messages: messages.elements,
			}};
			break;
		}

		default:
	}

	return nextState;
};
