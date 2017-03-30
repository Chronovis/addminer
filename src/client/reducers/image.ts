import {IKeyValue} from '../../interfaces';

interface IInitialState {
	imageHeight: number;
	imageSrc: string;
	imageWidth: number;
	percentageLoaded: number;
	tags: IKeyValue[];
}

const initialState: IInitialState = {
	imageHeight: null,
	imageSrc: null,
	imageWidth: null,
	percentageLoaded: 0,
	tags: [],
};

export default (state = initialState, action) => {
	let nextState = state;

	switch (action.type) {
		case 'IMAGE_UPLOAD_START': {
			nextState = { ...nextState, ...{
				imageHeight: action.image.height,
				imageSrc: action.imageSrc,
				imageWidth: action.image.width,
			}};
			break;
		}

		case 'IMAGE_UPLOAD_PROGRESS': {
			nextState = { ...nextState, ...{
				percentageLoaded: action.percentage,
			}};
			break;
		}

		case 'SET_UPLOAD_TAGS': {
			nextState = { ...nextState, ...{
				tags: action.tags,
			}};
			break;
		}

		default:
	}

	return nextState;
};
