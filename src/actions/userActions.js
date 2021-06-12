import * as types from './ActionTypes'
import userService from '../services/userService'

function loginSuccess(response) {
    return {
        type: types.LOGIN_USER_SUCCESS,
        payload: response
    }
}

function otpSuccess(response) {
    return {
        type: types.OTP_VERIFICATION_SUCCESS,
        payload: response
    }
}

function registerSuccess(response) {
    return {
        type: types.REGISTER_USER_SUCCESS,
        payload: response
    }
}

function handleClearRegisterSuccess() {
    return {
        type: types.CLEAR_REGISTER_USER_SUCCESS
    }
}

function handleError(error) {
    return {
        type: types.GENERIC_REQUEST_FAILED,
        errors: error && error.response && error.response.data
    }
}

export function loginUser(data) {
    return (dispatch) => {
        userService.loginUser(data).then((response) => {
            dispatch(loginSuccess(response))
        }, (error) => {
            dispatch(handleError(error))
        })
    }
}

export function otpVerification(data) {
    return (dispatch) => {
        userService.otpVerification(data).then((response) => {
            dispatch(otpSuccess(response))
        }, (error) => {
            dispatch(handleError(error))
        })
    }
}

export function register(data) {
    return (dispatch) => {
        userService.register(data).then((response) => {
            dispatch(registerSuccess(response))
        }, (error) => {
            dispatch(handleError(error))
        })
    }
}

export function clearErrorHeader() {
    return (dispatch) => {
        dispatch(handleError({}))
    }
}
