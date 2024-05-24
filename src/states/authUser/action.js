/**
 * @TODO: Define all the actions (creator) for the authUser state
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';

const ActionType = {
  SET_AUTH_USER: 'SET_AUTH_USER',
  UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

const setAuthUserActionCreator = (authUser) => ({
  type: ActionType.SET_AUTH_USER,
  payload: {
    authUser,
  },
});

const unSetAuthUserActionCreator = () => ({
  type: ActionType.UNSET_AUTH_USER,
  payload: null,
});

// Thunk Function
const asyncSetAuthUser = ({ id, password }) => async (dispatch) => {
  dispatch(showLoading());

  try {
    const token = await api.login({ id, password });
    api.putAccessToken(token);
    const authUser = await api.getOwnProfile();

    dispatch(setAuthUserActionCreator(authUser));
  } catch (error) {
    alert(error.message);
  }

  dispatch(hideLoading());
};

const asyncUnsetAuthUser = () => (dispatch) => {
  dispatch(unSetAuthUserActionCreator());
  api.putAccessToken('');
};

export {
  ActionType,
  setAuthUserActionCreator,
  unSetAuthUserActionCreator,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
};
