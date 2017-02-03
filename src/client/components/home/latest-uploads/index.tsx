import * as React from 'react';

// Map the file extensions to the file mime-type
const extByMimeType = {
	'image/png': 'png',
	'image/jpeg': 'jpeg',
};

export default ({ latestUploads }) =>
	<div className="latest-uploads">
		<h3>Latest uploads</h3>
		{
			latestUploads.length === 0 ?
				<div className="no-uploads-found">No uploads yet?</div> :
				<ul>
					{
						latestUploads.map((lu, i) =>
							<li key={i}>
								<img
									src={`${lu.hash}.${extByMimeType[lu.mimetype]}`}
								/>
							</li>
						)
					}
				</ul>
		}
	</div>;
