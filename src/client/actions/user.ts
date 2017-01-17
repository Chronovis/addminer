import 'whatwg-fetch';
import history from '../routes/history';

export const userLogin = (formData) => (dispatch, getState) => {
	fetch('/api/login', {
		body: formData,
		method: 'POST',
	})
		.then((response) => response.json())
		.then((response) => {
			dispatch({
				authenticated: response['authenticated'],
				type: 'USER_LOGIN',
				user: response['user'],
			});

			history.replace('/');
		});
};
