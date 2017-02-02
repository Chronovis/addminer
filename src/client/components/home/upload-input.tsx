import * as React from 'react';
import history from '../../routes/history';

export default ({ uploadImage }) =>
	<div className="upload-input">
		<input
			accept="image/*"
			capture={true}
			onChange={(ev) => {
				history.push('/upload');
				uploadImage(ev.target['files'][0]);
			}}
			type="file"
		/>
	</div>;

