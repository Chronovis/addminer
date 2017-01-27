import * as cx from 'classnames';
import * as React from 'react';

export default ({ imageHeight, imageSrc, imageWidth, percentageLoaded }) => {
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
	);
};
