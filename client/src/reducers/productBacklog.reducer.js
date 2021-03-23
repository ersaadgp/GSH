import _ from 'lodash';
import actionTypes from '../constant/action-types';

export default (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_PBITEM:
      return { ..._.mapKeys(action.payload, 'PBItemID') };
    case actionTypes.ADD_PBITEM:
      return { ...state, [action.payload[0].PBItemID]: action.payload[0] };
    case actionTypes.ADD_PBITEM_FAILED:
      return state;
    case actionTypes.FETCH_PBITEM_ID:
      return { ...state, [action.payload.PBItemID]: action.payload };
    default:
      return state;
  }
};
