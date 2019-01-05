import * as constants from './constants';
import { Actions } from 'react-native-router-flux';
import firebaseService from '@utils/firebase'
const FIREBASE_REF_USERS = firebaseService.database().ref('users')  //firebase node reference
const FIREBASE_REF_USERS_UPDATE = firebaseService.database()

export function actionIsLoading() {
  return {
    type: constants.ACTION_IS_LOADING,
  };
}

export function actionIsLoggedIn(user) {
  return {
    type: constants.IS_LOGIN_DONE,
    user
  };
}

export function actionIsRegistered(user) {
  return {
    type: constants.IS_REG_DONE,
    user
  };
}

export function actionIsError(error) {
  return {
    type: constants.IS_ANY_ERROR,
    error,
  };
}
export function actionUserList(userList) {
  return {
    type: constants.IS_USERLIST_LOADED,
    userList,
  };
}
export function actionLogout() {
  return {
    type: constants.USER_LOGOUT,
  };
}

export function registerUser(username,password,email,registerToken) {
  return dispatch => {
    dispatch(actionIsLoading())
    firebaseService.auth()
    .createUserWithEmailAndPassword(email,password).then((firebaseUser)=>{
      firebaseUser.updateProfile({'displayName':username });
      let createdAt = new Date().getTime()

      let userObj = {
        id: firebaseUser.uid,
        username: username,
        password:password,
        email:email,
        pushToken:registerToken
      }
      FIREBASE_REF_USERS.child(firebaseUser.uid).set(userObj, (error) => {
        if (error) {
          alert(error)
          dispatch(actionIsError(error))
        } else {
          Actions.Home({type:'reset'})
          dispatch(actionIsRegistered())
        }
      })
    })
    .catch(error => {
      alert(error)
      dispatch(actionIsError(error))
    })
  }
}

export function loginUser(username,password,pushToken) {
  return dispatch =>{
    dispatch(actionIsLoading())
    firebaseService.auth()
    .signInWithEmailAndPassword(username,password).then((user)=>{
      FIREBASE_REF_USERS_UPDATE.ref('users/'+user.uid).update({pushToken})
      dispatch(actionIsLoggedIn(user))
      Actions.Home({type:'reset'})
    })
    .catch(error => {
      alert(error)
      dispatch(actionIsError(error))
    })

    let unsubscribe = firebaseService.auth()
    .onAuthStateChanged(user => {
      if (user) {
        dispatch(actionIsLoggedIn(user))
      }
    })
  }

}

export function logout(username,password) {
  return dispatch =>{
    dispatch(actionIsLoading())
    firebaseService.auth().signOut().then(()=>{
      dispatch(actionLogout())
      Actions.Login({type:'reset'})
    }).catch((error)=>{
      dispatch(actionIsError(errorObject))
    })
  }
}

export function restoreSession () {
  return dispatch => {
    let unsubscribe = firebaseService.auth()
    .onAuthStateChanged(user => {
      if (user) {
        dispatch(actionIsLoggedIn(user))
        unsubscribe()
      } else {
        unsubscribe()
      }
    })
  }
}

export function getUsersList() {
  return dispatch => {
    let  userListArray = [];
    dispatch(actionIsLoading())
    firebaseService.auth()
    .onAuthStateChanged(user => {
      if (user) {
        FIREBASE_REF_USERS.on('value', (snapshot) => {    //getting snapshot and pushing it into the object
          snapshot.forEach(child => {
            //console.warn(child.val().email.toLowerCase(),user.email.toLowerCase());
            if (child.val().email.toLowerCase() != user.email.toLowerCase())
            userListArray.push({
              name: child.val().username,
              id: child.val().id,
              email: child.val().email,
              pushToken:child.val().pushToken
            });
          });
          dispatch(actionUserList(userListArray))
        }, (errorObject) => {
          dispatch(actionIsError(errorObject))
        })
      }
    })

  }
}
