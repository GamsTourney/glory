import { request } from 'modules/api'
import { fetchTournamentCollection } from 'modules/api/actions'
import { removeToken } from 'utils/user'
import { API_UNAUTHORIZED } from './dux'

function requestToken(auth) {
  return request('players', '/auth/login', {
    method: 'POST',
    data: { auth }
  })
}

function logout() {
  removeToken()
  return {
    type: API_UNAUTHORIZED
  }
}

function fetchPlayer(playerId) {
  return request('players', `/players/${playerId}`)
}

const fetchPlayers = tournamentId =>
  fetchTournamentCollection('players', tournamentId)

export { requestToken, logout, fetchPlayer, fetchPlayers }
