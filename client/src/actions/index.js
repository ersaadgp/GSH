import actionType from '../constant/action-types';
import history from '../history';
import apis from '../apis';

class userAction {
  fetchDatas = () => async (dispatch) => {
    const response = await apis.get('/apis/users');

    dispatch({
      type: actionType.FETCH_DATAS,
      payload: response.data,
    });
  };

  fetchData = (id) => async (dispatch) => {
    const response = await apis.get(`/apis/users/${id}`);

    dispatch({
      type: actionType.FETCH_DATA,
      payload: response.data,
    });
  };

  editData = (id, formValues) => async (dispatch) => {
    const response = await apis.patch(`/apis/users/${id}`, formValues);

    dispatch({
      type: actionType.EDIT_DATA,
      payload: response.data,
    });

    history.push('/');
  };
}

export default new userAction();
