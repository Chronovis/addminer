import * as React from 'react';
import { connect } from 'react-redux';
import UploadProgress from './upload-progress';

export default (props) =>
	<div className="upload">
		<UploadProgress {...props} />;
		<div className="metadata">
			<ul>
				<li>bla</li>
				<li>ble</li>
			</ul>
		</div>
	</div>;
