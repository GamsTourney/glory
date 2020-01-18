import { createSelector } from 'reselect'
import get from 'lodash/get'
import filter from 'lodash/filter'

import { selectActiveTournamentId } from 'modules/tournaments/selectors'
import { createPropGetter } from 'selectors/helpers'

const selectMatches = state => get(state, 'entities.matches')

const selectTournamentMatches = createSelector(
  selectMatches,
  selectActiveTournamentId,
  createPropGetter('tournamentId'),
  (matches, activeId, tournamentId) => {
    const tId = tournamentId || activeId
    return filter(matches, m => m.tournamentId === tId && !m.hidden)
  }
)

export { selectMatches, selectTournamentMatches }
