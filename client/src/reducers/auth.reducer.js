import actionTypes from '../constant/action-types';

const INITIAL_STATE = {
  isSignedIn: null,
  userID: null,
  userName: null,
  email: null,
  userType: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.LOG_IN:
      return {
        ...state,
        isSignedIn: true,
        userID: action.payload.userID,
        userName: action.payload.userName,
        email: action.payload.email,
        userType: action.payload.userType,
      };
    case actionTypes.FETCH_LEVEL_ACCESS:
      return { ...state, ...action.payload[0] };
    case actionTypes.LOG_IN_FAILED:
      return { ...state, logInStatus: 'failed' };
    case actionTypes.LOG_OUT:
      return {};
    default:
      return state;
  }
};
