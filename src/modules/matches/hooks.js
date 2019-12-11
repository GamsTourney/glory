import { useTournamentCollection } from 'modules/tournaments/hooks'
import { fetchMatches } from './actions'
import { selectTournamentMatches } from './selectors'

const useTournamentMatches = () =>
  useTournamentCollection(fetchMatches, selectTournamentMatches)

export { useTournamentMatches }
