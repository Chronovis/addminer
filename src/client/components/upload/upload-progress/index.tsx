import * as cx from 'classnames';
import * as React from 'react';

export default ({ imageSrc, percentageLoaded }) => {
	const status = percentageLoaded === 1 ?
		'✓' :
		`${Math.round(percentageLoaded * 100)}%`;

	return (
		<div
			className="upload-progress"
		>
			<img
				src={imageSrc}
			/>
			<div
				className="loader"
				style={{
					height: `${100 - (percentageLoaded * 100)}%`,
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
