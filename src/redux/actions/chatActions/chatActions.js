import * as constants from './constants';
import { Actions } from 'react-native-router-flux';
import firebaseService from '@utils/firebase'

const FIREBASE_REF_MESSAGES = firebaseService.database().ref('Messages')
const FIREBASE_REF_MESSAGES_LIMIT = 20

export function actionChatLoading() {
  return {
    type: constants.IS_MESSAGE_LOADING,
  };
}

export function actionMessageSendSucess() {
  return {
    type: constants.MESSAGE_SEND_SUCCESS,
  };
}

export function actionChatLoaded(messages) {
  return {
    type: constants.LOADING_DONE,
    messages
  };
}

export function actionChatMessageError(error) {
  return {
    type: constants.MESSAGE_ERROR,
    error:error,
  };
}


export function oneToOneChatLoading (receiverId) {
  return dispatch => {
    dispatch(actionChatLoading())
    let currentUser = firebaseService.auth().currentUser
    console.warn(currentUser);
    let chatId= currentUser.uid > receiverId?`${currentUser.uid}-${receiverId}`:`${receiverId}-${currentUser.uid}`  //creating chat id for both the users message
    let FIREBASE_ONE_TO_ONE_CHAT = firebaseService.database().ref().child("chat/" + chatId);
    FIREBASE_ONE_TO_ONE_CHAT.limitToLast(FIREBASE_REF_MESSAGES_LIMIT).on('value', (snapshot) => {
      //console.warn(snapshot);
      dispatch(actionChatLoaded(snapshot.val()))
    }, (errorObject) => {
      dispatch(actionChatMessageError(errorObject.message))
    })
  }
}

export function oneToOneChat(message,receiverId,pushToken) {
  return dispatch =>{
    dispatch(actionChatLoading())
    let currentUser = firebaseService.auth().currentUser
    let chatId= currentUser.uid > receiverId?`${currentUser.uid}-${receiverId}`:`${receiverId}-${currentUser.uid}`//creating chat id for both the users message
    let FIREBASE_ONE_TO_ONE_CHAT = firebaseService.database().ref().child("chat/" + chatId);
    let createdAt = new Date().getTime()
    let chatMessage = {
      _id: createdAt,
      text: message,
      createdAt: createdAt,
      senderId: currentUser.uid,
      user:{
        username:currentUser.displayName,
        pushToken,
        id: currentUser.uid
      },
      receiverid: receiverId,
      order: -1 * createdAt,

    }
    FIREBASE_ONE_TO_ONE_CHAT.push().set(chatMessage, (error) => {
      if (error) {
        dispatch(actionChatMessageError(error.message))
      } else {
        dispatch(actionMessageSendSucess())
      }
    })
  }
}
