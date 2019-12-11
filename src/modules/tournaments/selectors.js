import { createSelector } from 'reselect'
import get from 'lodash/get'
import values from 'lodash/values'

import { selectCurrentPlayer } from 'modules/players/selectors'

const selectTournaments = state => get(state, 'entities.tournaments')
const selectTournamentsList = createSelector(selectTournaments, t => values(t))

const selectActiveTournamentId = createSelector(selectCurrentPlayer, player =>
  get(player, 'activeTournamentId')
)

export { selectTournaments, selectTournamentsList, selectActiveTournamentId }
