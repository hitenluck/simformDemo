import createReducer from '@app/createReducer';
import * as constants from '@actions/chatActions/constants';

const intialState = {
  sending: false,
  messageError: null,
  messages: {},
  isLoading:false,
};
export const chatReducers = createReducer(intialState, {

  [constants.LOADING_DONE](state,action) {
    return Object.assign({}, state, {
       messages: action.messages,
       loadMessagesError: null,
       isLoading:false,
    });
  },

  [constants.IS_MESSAGE_LOADING](state,action) {
    return Object.assign({}, state, {
       messageError: null,
       isLoading:true,
    });
  },
  [constants.MESSAGE_ERROR](state,action) {
    return Object.assign({}, state, {
       messageError: action.error,
       isLoading:false,

    });
  },
  [constants.MESSAGE_SEND_SUCCESS](state,action) {
    return Object.assign({}, state, {
       messageError: null,

    });
  },
});
