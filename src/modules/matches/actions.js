import { request } from 'modules/api'
import { fetchTournamentCollection } from 'modules/api/actions'

function fetchMatch(matchId) {
  return request('matches', `/matches/${matchId}`)
}

const fetchMatches = tournamentId =>
  fetchTournamentCollection('matches', tournamentId)

const updateMatch = (matchId, data) => {
  return request('matches', `/matches/${matchId}`, {
    method: 'PATCH',
    data
  })
}

export { fetchMatch, fetchMatches, updateMatch }
