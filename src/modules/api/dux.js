import { API_FETCH, API_RECEIVE } from 'modules/api'
import get from 'lodash/get'
import keyBy from 'lodash/keyBy'
import merge from 'lodash/merge'
import omit from 'lodash/omit'

const initialState = {
  games: {},
  matches: {},
  players: {},
  tournaments: {}
}

function extractData(data) {
  const objects = Array.isArray(data) ? data : [data]
  return keyBy(objects, 'id')
}

export default function entities(state = initialState, action) {
  let newState
  const entity = get(action, 'entity')
  const method = get(action, 'method')
  switch (action.type) {
    case API_FETCH:
      return action
    case API_RECEIVE:
      if (entity) {
        if (method === 'DELETE') {
          newState = omit(state, [`${entity}.${action[entity].id}`])
        } else {
          newState = merge({}, state, {
            [entity]: extractData(action[entity])
          })
        }
        return newState
      }
      return state
    default:
      return state
  }
}
