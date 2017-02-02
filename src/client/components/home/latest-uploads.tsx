import * as React from 'react';

export default ({ latestUploads }) =>
	<div className="latest-uploads">
		<ul>
			{
				latestUploads.map((lu, i) =>
					<li><img src={lu.src} /></li>
				)
			}
		</ul>
	</div>;
