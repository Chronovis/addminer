import AutocompleteList from 'hire-forms-autocomplete-list';
import * as React from 'react';
import {IKeyValue} from '../../../../interfaces';

interface IMetadataProps {
	autocompleteTag: (q: string, done: () => void) => void;
	newUploadTags: IKeyValue[];
	setUploadTags: (tags: IKeyValue[]) => void;
}

interface IMetadataState {
	inputValue?: string;
}

class Metadata extends React.Component<IMetadataProps, IMetadataState> {
	public state = {
		inputValue: '',
	};

	public render() {
		return (
			<div className="metadata">
				<AutocompleteList
					async={this.props.autocompleteTag}
					focus
					onChange={this.handleNextTags}
					onInputChange={(inputValue: string) => this.setState({ inputValue })}
					placeholder="Enter tags"
					showNothingFoundMessage
					value={{ key: null, value: this.state.inputValue }}
					values={this.props.newUploadTags}
				>
					<div
						className="add-new-tag-to-list"
						onClick={this.handleAddNewTag}
					>
						+
					</div>
				</AutocompleteList>
			</div>
		);
	}

	private handleAddNewTag = () => {
		const nextTags = this.props.newUploadTags
			.concat({
				key: null,
				value: this.state.inputValue,
			});

		this.handleNextTags(nextTags);
	};

	private handleNextTags = (nextTags) => {
		this.setState({ inputValue: '' });
		this.props.setUploadTags(nextTags);
	}
}

export default Metadata;
