import { parseError } from 'utils/network';
import { replace } from 'react-router-redux';

export default ({dispatch}) => next => action => {
	if (action.error) {
		const { code } = parseError(action.error);
		if (code === 404) {
			return dispatch(replace('/not-found'));
		}
	}

	return next(action);
};
