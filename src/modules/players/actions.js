import { request } from 'modules/api'

function requestToken(auth) {
  return request('players', '/auth/login', {
    method: 'POST',
    data: { auth }
  })
}

function fetchPlayer(playerId) {
  return request('players', `/players/${playerId}`)
}

export { requestToken, fetchPlayer }
