import * as types from '../actions/ActionTypes'
let initialState = {
    credsSuccess: false,
    otpSuccess: false
}

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_USER_SUCCESS: {
            return {
                ...state,
                credsSuccess: action && action.payload && action.payload.success || false,
                email: action && action.payload && action.payload.email
            }
        }

        case types.OTP_VERIFICATION_SUCCESS: {
            return {
                ...state,
                otpSuccess: action && action.payload && action.payload.success || false,
                token: action && action.payload && action.payload.token,
                email: action && action.payload && action.payload.email,
                name: action && action.payload && action.payload.message && action.payload.message.name
            }
        }

        case types.REGISTER_USER_SUCCESS: {
            return {
                ...state,
                registerSuccess: action && action.payload && action.payload.success || false
            }
        }
        
        case types.GENERIC_REQUEST_FAILED: {
            return {
                ...state,
                requestErrors: action && action.errors && action.errors.errors,
                registerSuccess: false
            }
        }
        
        default:
            return state
    }
}