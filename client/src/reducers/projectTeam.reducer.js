import _ from 'lodash';
import actionTypes from '../constant/action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS_PRODUCT_OWNER:
      return { ...state, ..._.mapKeys(action.payload, 'projectID') };
    case actionTypes.ADD_PROJECT_TEAM:
      return { ...state, [action.payload.userID]: action.payload };
    case actionTypes.UPDATE_PROJECT_TEAM:
      return { ...state, [action.payload.userID]: action.payload };
    case actionTypes.FETCH_PROJECT_TEAM:
      return { ..._.mapKeys(action.payload, 'userID') };
    case actionTypes.FETCH_PROJECT_OWNER:
      return { ...state, ...action.payload };
    case actionTypes.DELETE_PROJECT_TEAM:
      return _.omit(state, [action.payload[0].userID]);
    default:
      return state;
  }
};
