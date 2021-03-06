const API_UNAUTHORIZED = 'API_UNAUTHORIZED'
const API_AUTHORIZED = 'API_AUTHORIZED'

export default function auth(state = {}, action) {
  switch (action.type) {
    case API_AUTHORIZED:
      return { currentPlayerId: action.currentPlayerId }
    case API_UNAUTHORIZED:
      return { currentPlayerId: null, unauthorized: true }
    default:
      return state
  }
}
export { API_AUTHORIZED, API_UNAUTHORIZED }
