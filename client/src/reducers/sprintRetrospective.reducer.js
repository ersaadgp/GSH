import actionTypes from '../constant/action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_RETROSPECTIVE:
      return { ...state, ...action.payload };
    case actionTypes.ADD_RETROSEPCTIVE:
      return { ...state, [action.payload[0].sprintID]: action.payload[0] };
    case actionTypes.ADD_RETROSPECTIVE_FAILED:
      return state;
    default:
      return state;
  }
};
