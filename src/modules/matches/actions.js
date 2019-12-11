import { fetchTournamentCollection } from 'modules/api/actions'

const fetchMatches = tournamentId =>
  fetchTournamentCollection('matches', tournamentId)

export { fetchMatches }
