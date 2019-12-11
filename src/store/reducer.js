import { combineReducers } from 'redux'
import entities from 'modules/api/dux'
import auth from 'modules/players/dux'

const reducer = combineReducers({
  auth,
  entities
})

export default reducer
