import { fetchTournamentCollection, fetchItem } from 'modules/api/actions'

const fetchGame = gameId => fetchItem('games', gameId)

const fetchGames = tournamentId =>
  fetchTournamentCollection('games', tournamentId)

export { fetchGame, fetchGames }
