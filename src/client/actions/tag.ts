import 'whatwg-fetch';

export const autocompleteTag = (q, done) => async (dispatch, getState) => {
	const response = await fetch(`/api/autocomplete/tag?q=${q}`);
	const results = await response.json();
	done(results);
};

