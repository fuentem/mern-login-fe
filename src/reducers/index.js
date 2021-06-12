import { combineReducers } from 'redux'
import userReducer from './userReducer'
const rootReducer = (state, action) => {
    return appReducer(state, action)
}

const appReducer = combineReducers({
    userReducer
})

export default rootReducer

