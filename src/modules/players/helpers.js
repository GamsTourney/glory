import jwtDecode from 'jwt-decode'
import get from 'lodash/get'

function getCurrentPlayerId(token = localStorage.getItem('token')) {
  const decoded = token ? jwtDecode(token) : {}
  return get(decoded, 'sub')
}

export { getCurrentPlayerId }
