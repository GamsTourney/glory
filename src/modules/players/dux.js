const API_UNAUTHORIZED = 'API_UNAUTHORIZED'
const API_AUTHORIZED = 'API_AUTHORIZED'

export default function auth(state = {}, action) {
  switch (action.type) {
    case API_AUTHORIZED:
      return { currentUserId: action.currentUserId }
    case API_UNAUTHORIZED:
      return { unauthorized: true }
    default:
      return state
  }
}
export { API_AUTHORIZED, API_UNAUTHORIZED }
