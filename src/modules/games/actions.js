import { fetchTournamentCollection } from 'modules/api/actions'

const fetchGames = tournamentId =>
  fetchTournamentCollection('games', tournamentId)

export { fetchGames }
