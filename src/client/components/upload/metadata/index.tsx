import AutocompleteList from 'hire-forms-autocomplete-list';
import * as React from 'react';

interface IMetadataProps {
	autocompleteTag: (q: string, done: () => void) => void,
}

interface IMetadataState {
	tags: string[],
}

class Metadata extends React.Component<IMetadataProps, IMetadataState> {
	public state = {
		tags: [],
	};

	private autocompleteListNode = null;

	public render() {
		return (
			<div className="metadata">
				<AutocompleteList
					async={this.props.autocompleteTag}
					focus
					onChange={(tags) => this.setState({ tags })}
					placeholder="Enter tags"
					values={this.state.tags}
				>
					<div
						className="add-new-tag-to-list"
						onClick={() => {
							this.setState({
								tags: this.state.tags.concat({
									key: null,
									value: this.autocompleteListNode.querySelector('input').value,
								})
							})
						}}
					>
						+
					</div>
				</AutocompleteList>
			</div>
		);
	}
};

export default Metadata;
