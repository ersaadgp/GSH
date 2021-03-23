import actionType from "../constant/action-types";
import apis from "../apis";

class authAction {
  logIn = () => async (dispatch) => {
    const response = await apis.post("/apis/authManager");

    dispatch({
      type: actionType.FETCH_DATAS,
      payload: response.data,
    });
  };
}

export default new authAction();
