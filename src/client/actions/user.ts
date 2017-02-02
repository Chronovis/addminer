import 'whatwg-fetch';
import history from '../routes/history';

export const userLogin = (formData) => (dispatch, getState) => {
	fetch('/api/login', {
		body: formData,
		method: 'POST',
	})
		.then((response) => {
			if (response.status === 200) {
				dispatch({
					token: response.headers.get('Authorization'),
					type: 'USER_LOGIN',
				});

				history.replace('/');
			}

			return response;
		})
		.then((response) => response.json())
		.then((json) => {
			return dispatch({
				message: json['message'],
				type: 'RECEIVE_MESSAGE',
			})
		});
};
