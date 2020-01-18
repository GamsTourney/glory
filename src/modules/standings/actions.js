import { fetchTournamentCollection } from 'modules/api/actions'

const fetchStandings = tournamentId =>
  fetchTournamentCollection('standings', tournamentId)

export { fetchStandings }
