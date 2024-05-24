/**
 * @TODO: Define all the actions (creator) for the isPreLoad state
 */

import { hideLoading, showLoading } from 'react-redux-loading-bar';
import api from '../../utils/api';
import { setAuthUserActionCreator } from '../authUser/action';

const ActionType = {
  SET_IS_PRELOAD: 'SET_IS_PRELOAD',
};

const setIsPreloadActionCreator = (isPreload) => ({
  type: ActionType.SET_IS_PRELOAD,
  payload: {
    isPreload,
  },
});

const asyncPreloadProcess = () => async (dispatch) => {
  dispatch(showLoading());

  try {
    // Preload Process
    const authUser = await api.getOwnProfile();
    dispatch(setAuthUserActionCreator(authUser));
  } catch (error) {
    // Fallback Process
    dispatch(setAuthUserActionCreator(null));
  } finally {
    dispatch(setIsPreloadActionCreator(false));
  }

  dispatch(hideLoading());
};

export { ActionType, setIsPreloadActionCreator, asyncPreloadProcess };
