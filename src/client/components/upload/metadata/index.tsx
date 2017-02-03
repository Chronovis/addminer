import * as React from 'react';
import AutocompleteList from 'hire-forms-autocomplete-list';

export default () => {
	return (
		<div
			className="metadata"
		>
			<AutocompleteList
				async={(query, done) => {
					console.log(query)
					done([{
						key: 'lass',
						value: 'lass'
					}, {
						key: 'less',
						value: 'less'
					}]);
				}}
				onChange={(ev) => console.log(ev)}
				placeholder="Enter tags"
		 	/>
		</div>
	);
};
