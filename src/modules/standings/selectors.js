import { createSelector } from 'reselect'
import { createPropGetter } from 'selectors/helpers'
import get from 'lodash/get'
import filter from 'lodash/filter'
import orderBy from 'lodash/orderBy'
import find from 'lodash/find'

import { selectActiveTournamentId } from 'modules/tournaments/selectors'

const selectStandings = state => get(state, 'entities.standings')

const selectTournamentStandings = createSelector(
  selectStandings,
  selectActiveTournamentId,
  (standings, tournamentId) =>
    orderBy(filter(standings, { tournamentId }), 'name')
)

const selectStandingAvatar = createSelector(
  selectTournamentStandings,
  createPropGetter('id'),
  (standings, id) => get(find(standings, { id }), 'avatar')
)

export { selectTournamentStandings, selectStandingAvatar }
