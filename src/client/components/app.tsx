import * as cx from 'classnames';
import * as React from 'react';
import { connect } from 'react-redux';
import { uploadImage } from '../actions/image';

interface IEventsProps {
	imageHeight: number;
	imageSrc: string;
	imageWidth: number;
	percentageLoaded: number;
	uploadImage: (file: any) => void;
}

class App extends React.Component<IEventsProps, {}> {
	public render() {
		const { imageHeight, imageSrc, imageWidth, percentageLoaded } = this.props;

		const clientHeight = document.documentElement.clientHeight;
		const clientWidth = document.documentElement.clientWidth;
		const maxHeight = clientHeight * 0.9;
		const maxWidth = clientWidth * 0.9;
		let height = imageHeight;
		let width = imageWidth;

		if (height > maxHeight) {
			const heightRatio = maxHeight / height;
			height = maxHeight;
			width *= heightRatio;
		}

		if (width > maxWidth) {
			const widthRatio = maxWidth / width;
			width = maxWidth;
			height *= widthRatio;
		}

		const status = percentageLoaded === 1 ?
			'✓' :
			`${Math.round(percentageLoaded * 100)}%`;

		return (
			<div className="app">
				{
					(imageSrc == null) &&
					<input
						accept="image/*"
						capture={true}
						onChange={(ev) => {
							this.props.uploadImage(ev.target['files'][0]);
						}}
						type="file"
					/>
				}
				{
					(imageSrc != null) &&
					<div
						className="image-placeholder"
						style={{ height, width }}
					>
						<img
							src={imageSrc}
							style={{ height, width }}
						/>
						<div
							className="loader"
							style={{
								height: height - (height * percentageLoaded),
								width,
							}}
						/>
						<div
							className={cx('status', {
								ready: percentageLoaded === 1,
							})}
						>
							{status}
						</div>
					</div>
				}
			</div>
		);
	}
}

export default connect(
	state => ({
		imageHeight: state.image.imageHeight,
		imageSrc: state.image.imageSrc,
		imageWidth: state.image.imageWidth,
		percentageLoaded: state.image.percentageLoaded,
	}),
	{ uploadImage },
)(App);
