import _ from 'lodash';
import actionTypes from '../constant/action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_STORY:
      return { ...state, ..._.mapKeys(action.payload, 'userStoryID') };
    case actionTypes.ADD_USER_STORY:
      return { ...state, [action.payload[0].userStoryID]: action.payload[0] };
    case actionTypes.ADD_USER_STORY_FAILED:
      return state;
    case actionTypes.COUNT_USER_STORY:
      return state.length
    case actionTypes.FETCH_USER_STORY_ID:
      return { ...state, [action.payload[0].userStoryID]: action.payload[0] };
    default:
      return state;
  }
};
