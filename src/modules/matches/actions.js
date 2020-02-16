import { request } from 'modules/api'
import { fetchTournamentCollection } from 'modules/api/actions'

function fetchMatch(matchId) {
  return request('matches', `/matches/${matchId}`)
}

function fetchPlayerMatches(playerId) {
  return request('matches', `/players/${playerId}/matches`)
}

const fetchMatches = tournamentId =>
  fetchTournamentCollection('matches', tournamentId)

const uploadPicture = (matchId, picture) => {
  const formData = new FormData()
  formData.append('result_picture', picture)
  return request('matches', `/matches/${matchId}/attach_picture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data: formData
  })
}

const updateMatch = (matchId, data) => {
  return request('matches', `/matches/${matchId}`, {
    method: 'PATCH',
    data
  })
}

export {
  fetchMatch,
  fetchPlayerMatches,
  fetchMatches,
  uploadPicture,
  updateMatch
}
