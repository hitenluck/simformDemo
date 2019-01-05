import createReducer from '@app/createReducer';
import * as constants from '@actions/appActions/constants';

const intialState = {
  isError:null,
  user:null,
  userList:null,
  isLoading:false,
};
export const appReducer = createReducer(intialState, {
  [constants.IS_ANY_ERROR](state,action) {
    return Object.assign({}, state, {
        isError: action.error,
        isLoading:false,
    });
  },
  [constants.IS_REG_DONE](state,action) {
    return Object.assign({}, state, {
        isError:null,
        isLoading:false,
    });
  },
  [constants.IS_LOGIN_DONE](state,action) {
    return Object.assign({}, state, {
        user: action.user,
        isError:null,
    });
  },
  [constants.IS_USERLIST_LOADED](state,action) {
    return Object.assign({}, state, {
        userList:action.userList,
        isLoading:false,
    });
  },
  [constants.ACTION_IS_LOADING](state,action) {
    return Object.assign({}, state, {
        isLoading:true,
    });
  },
  [constants.USER_LOGOUT](state,action) {
    return Object.assign({}, state, {
        isLoading:false,
        user: null,
    });
  },
});
