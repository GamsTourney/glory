import { useTournamentCollection } from 'modules/tournaments/hooks'
import { fetchStandings } from './actions'
import { selectTournamentStandings } from './selectors'

const useTournamentStandings = () =>
  useTournamentCollection(fetchStandings, selectTournamentStandings)

export { useTournamentStandings }
