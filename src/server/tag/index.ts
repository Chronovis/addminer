import pgConnect from '../pg-pool';
import { autocompleteTag } from './sql';

export default (app) => {
	app.get(
		'/autocomplete/tag',
		async (req, res) => {
			try {
				const result = await pgConnect(autocompleteTag(req.query.q));
				res.json(result['rows'][0]['tags']);
			} catch (error) {
			}
		}
	);
}
