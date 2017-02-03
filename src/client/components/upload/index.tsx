import * as React from 'react';
import { connect } from 'react-redux';
import UploadProgress from './upload-progress';
import Metadata from './metadata';

export default (props) =>
	<div className="upload">
		<UploadProgress {...props} />
		<Metadata {...props} />
	</div>;
