import { createSelector } from 'reselect'
import get from 'lodash/get'
import filter from 'lodash/filter'

import { createPropGetter } from 'selectors/helpers'

const selectMatches = state => get(state, 'entities.matches')

const selectTournamentMatches = createSelector(
  selectMatches,
  createPropGetter('tournamentId'),
  (matches, tournamentId) => {
    return filter(matches, { tournamentId })
  }
)

export { selectMatches, selectTournamentMatches }
