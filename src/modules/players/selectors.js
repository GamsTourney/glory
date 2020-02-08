import { createSelector } from 'reselect'
import { createPropGetter } from 'selectors/helpers'
import get from 'lodash/get'
import filter from 'lodash/filter'

const selectAuth = state => state.auth || {}
const selectPlayers = state => get(state, 'entities.players')
const selectCurrentPlayerId = state => get(state, 'auth.currentPlayerId')
const selectIsAuthenticated = createSelector(
  selectAuth,
  auth => !auth.unauthorized
)

const selectCurrentPlayer = createSelector(
  selectPlayers,
  selectCurrentPlayerId,
  (players, playerId) => get(players, playerId, {})
)

const selectPlayer = createSelector(
  selectPlayers,
  createPropGetter('playerId'),
  (players, playerId) => get(players, playerId, {})
)

const selectTournamentPlayers = createSelector(
  selectPlayers,
  selectCurrentPlayer,
  createPropGetter('tournamentId'),
  (players, currentPlayer, tournamentId) => {
    const activeId = get(currentPlayer, 'activeTournamentId')
    const tId = tournamentId || activeId
    return filter(players, { tournamentId: tId })
  }
)

export {
  selectIsAuthenticated,
  selectPlayers,
  selectCurrentPlayerId,
  selectCurrentPlayer,
  selectPlayer,
  selectTournamentPlayers
}
