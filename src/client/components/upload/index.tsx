import * as React from 'react';
import { connect } from 'react-redux';
import UploadProgress from './upload-progress';

const Upload = (props) =>
	<UploadProgress {...props} />;

export default connect(
	(state) => ({
		imageHeight: state.image.imageHeight,
		imageSrc: state.image.imageSrc,
		imageWidth: state.image.imageWidth,
		percentageLoaded: state.image.percentageLoaded,
	}),
	{},
)(Upload);
