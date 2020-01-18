import { useTournamentCollection } from 'modules/tournaments/hooks'
import { fetchGames } from './actions'
import { selectTournamentGames } from './selectors'

const useTournamentGames = () =>
  useTournamentCollection(fetchGames, selectTournamentGames)

export { useTournamentGames }
