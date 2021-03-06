import * as React from 'react';
import LatestUploads from './latest-uploads/index';
import UploadInput from './upload-input';

export default (props) =>
	<div className="home">
		<UploadInput {...props} />
		<LatestUploads {...props} />
	</div>;

