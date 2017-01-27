import * as React from 'react';
import { connect } from 'react-redux';
import { uploadImage } from '../actions/image';
import { unsetCurrentMessage } from '../actions/message';
import Message from './message/index';

const App = (props) =>
	<div className="app">
		<Message
			message={props.message}
		  unsetCurrentMessage={props.unsetCurrentMessage}
		/>
		<header><h1>Addminer</h1></header>
		{React.cloneElement(props.children, {...props})}
	</div>;

export default connect(
	(state) => ({
		imageHeight: state.image.imageHeight,
		imageSrc: state.image.imageSrc,
		imageWidth: state.image.imageWidth,
		message: state.message.currentMessage,
		percentageLoaded: state.image.percentageLoaded,
	}),
	{
		unsetCurrentMessage,
		uploadImage,
	},
)(App);
