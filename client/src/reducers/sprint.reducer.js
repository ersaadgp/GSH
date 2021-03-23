import _ from 'lodash';
import actionTypes from '../constant/action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.INIT_SPRINT:
      return { ...state, [action.payload[0].sprintID]: action.payload };
    case actionTypes.FETCH_SPRINTS:
      return { ...state, ..._.mapKeys(action.payload, 'sprintID') };
    case actionTypes.PATCH_SPRINT_END:
      return _.omit(state, [action.payload[0].sprintID]);
    case actionTypes.PATCH_SPRINT_START:
      return { ...state, [action.payload[0].sprintID]: action.payload }
    default:
      return state;
  }
};
