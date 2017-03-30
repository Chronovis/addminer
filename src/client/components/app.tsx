import * as React from 'react';
import { connect } from 'react-redux';
import {uploadImage, setUploadTags} from '../actions/image';
import { unsetCurrentMessage } from '../actions/message';
import { autocompleteTag } from '../actions/tag';
import Message from './message/index';

const App = (props) =>
	<div className="app">
		<Message
			message={props.message}
			unsetCurrentMessage={props.unsetCurrentMessage}
		/>
		<header><h1>Addminer</h1></header>
		<div className="body">
			{React.cloneElement(props.children, {...props})}
		</div>
	</div>;

export default connect(
	(state) => ({
		imageHeight: state.image.imageHeight,
		imageSrc: state.image.imageSrc,
		imageWidth: state.image.imageWidth,
		latestUploads: state.user.latestUploads,
		message: state.message.currentMessage,
		newUploadTags: state.image.tags,
		percentageLoaded: state.image.percentageLoaded,
	}),
	{
		autocompleteTag,
		setUploadTags,
		unsetCurrentMessage,
		uploadImage,
	},
)(App);
