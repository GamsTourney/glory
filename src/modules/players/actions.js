import { request } from 'modules/api'
import { fetchTournamentCollection } from 'modules/api/actions'

function requestToken(auth) {
  return request('players', '/auth/login', {
    method: 'POST',
    data: { auth }
  })
}

function fetchPlayer(playerId) {
  return request('players', `/players/${playerId}`)
}

const fetchPlayers = tournamentId =>
  fetchTournamentCollection('players', tournamentId)

export { requestToken, fetchPlayer, fetchPlayers }
