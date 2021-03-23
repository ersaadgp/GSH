import _ from 'lodash';
import actionTypes from '../constant/action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PROJECTS:
      return { ...state, ..._.mapKeys(action.payload, 'projectID') };
    case actionTypes.FETCH_PROJECTS_FINISHED:
      return _.mapKeys(action.payload, 'projectID');
    case actionTypes.FETCH_PROJECT_DETAIL:
      return {
        ...state,
        [action.payload.projectID]: action.payload,
      };
    case actionTypes.ADD_PROJECTS:
      return {
        ...state,
        [action.payload.project.projectID]: action.payload.project,
      };
    case actionTypes.ADD_PROJECTS_FAILED:
      return state;
    case actionTypes.CLEAR_PROJECT:
      return {};
    case actionTypes.PATCH_PROJECT_END:
      return _.omit(state, [action.payload[0].projectID]);
    default:
      return state;
  }
};
