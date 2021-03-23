import _ from 'lodash';
import actionTypes from '../constant/action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECT_DETAIL:
      return {
        ...state,
        [action.payload.projectID]: action.payload,
      };
    default:
      return state;
  }
};
