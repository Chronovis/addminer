import * as React from 'react';
import { connect } from 'react-redux';
import { uploadImage } from '../../actions/image';
import UploadInput from './upload-input';

const Home = (props) =>
	<div className="home">
		<UploadInput {...props} />
	</div>;

export default connect(
	null,
	{ uploadImage },
)(Home);
