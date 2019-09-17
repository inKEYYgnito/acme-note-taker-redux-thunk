import { combineReducers } from 'redux'
import notes from './notes'
import user from './user'
import utils from './utils'

const reducer = combineReducers({
    notes,
    user,
    utils
})

export default reducer
