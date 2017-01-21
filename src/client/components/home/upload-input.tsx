import * as React from 'react';
import history from '../../routes/history';

export default ({ uploadImage }) =>
	<input
		accept="image/*"
		capture={true}
		onChange={(ev) => {
			history.push('/upload');
			uploadImage(ev.target['files'][0]);
		}}
		type="file"
	/>;

