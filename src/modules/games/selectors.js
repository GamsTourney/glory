import { createSelector } from 'reselect'
import { createPropGetter } from 'selectors/helpers'
import get from 'lodash/get'
import filter from 'lodash/filter'

import { selectActiveTournamentId } from 'modules/tournaments/selectors'

const selectGames = state => get(state, 'entities.games')

const selectTournamentGames = createSelector(
  selectGames,
  selectActiveTournamentId,
  (standings, tournamentId) => filter(standings, { tournamentId })
)

const selectGame = createSelector(
  selectGames,
  createPropGetter('gameId'),
  (games, gameId) => get(games, gameId, {})
)

export { selectTournamentGames, selectGame }
