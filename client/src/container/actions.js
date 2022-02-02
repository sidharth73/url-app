import * as actionType from './types';
import * as AuthService from '../components/services/auth.service';

//register action
const registerAction = (payload) => (dispatch) => {
    return AuthService.register(payload)
      .then(response => {
          dispatch({
              type: actionType.REGISTER_SUCCESS,
              payload: response

          })
          return Promise.resolve(response)
      })
      .catch(error => {
          dispatch({
              type: actionType.REGISTER_FAIL,
              payload: { err: error.message || "Registeration Failed" }
          })
          return Promise.reject(error);
      })
}

const loginAction = (userCredential) => (dispatch) => {
    return AuthService.login(userCredential)
       .then(data => {
           dispatch({
               type: actionType.LOGIN_SUCCESS,
               payload: data
           })
           return Promise.resolve(data)
       })
       .catch(error => {
           dispatch({
               type: actionType.LOGIN_FAIL,
               payload: { err: error.message || "Login Failed" }
           })
           return Promise.reject(error);
       })
}

const logoutAction = () => (dispatch) => {
    const msg = AuthService.logout()

    try {
        dispatch({
            type: actionType.LOGOUT,
            payload: { msg }
        })
    } catch (error) {
        return Promise.resolve(msg)
    }
}

const addUrlAction = (payload) => (dispatch) => {
    return AuthService.addUrl(payload)
    .then(response => {
        dispatch({
            type: actionType.ADDURL_SUCCESS,
            payload: response
        })
        return Promise.resolve(response)
    })
    .catch(error => {
        dispatch({
            type: actionType.ADDURL_FAIL,
            payload: { err: error.message || "Add Url Failed" }
        })
        return Promise.reject(error);
    })
}

const updateUrlAction = (payload) => (dispatch) => {
    return AuthService.updateUrl(payload)
    .then(response => {
        dispatch({
            type: actionType.UPDATEURL_SUCCESS,
            payload: response
        })
        return Promise.resolve(response)
    })
    .catch(error => {
        dispatch({
            type: actionType.UPDATEURL_FAIL,
            payload: { err: error.message || "Add Url Failed" }
        })
        return Promise.reject(error);
    })
}

const deleteUrlAction = (payload) => (dispatch) => {
    return AuthService.deleteUrl(payload)
    .then(response => {
        dispatch({
            type: actionType.DELETEURL_SUCCESS,
            payload: response
        })
        return Promise.resolve(response)
    })
    .catch(error => {
        dispatch({
            type: actionType.DELETEURL_FAIL,
            payload: { err: error.message || "Add Url Failed" }
        })
        return Promise.reject(error);
    })
}
export {
    registerAction,
    loginAction,
    logoutAction,
    addUrlAction,
    deleteUrlAction,
    updateUrlAction
}