import _ from 'lodash';
import actionTypes from '../constant/action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_TASK:
      return { ...state, ..._.mapKeys(action.payload, 'taskID') };
    case actionTypes.FETCH_PROJECT_TASK:
      return { ...state, ...action.payload };
    case actionTypes.ADD_TASK:
      return { ...state, [action.payload.taskID]: action.payload };
    case actionTypes.ADD_TASK_FAILED:
      return state;
    case actionTypes.PATCH_TASK:
      return { ...state, [action.payload.taskID]: action.payload };
    default:
      return state;
  }
};
