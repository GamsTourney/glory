import { createSelector } from 'reselect'
import get from 'lodash/get'

const selectAuth = state => state.auth || {}
const selectIsAuthenticated = createSelector(
  selectAuth,
  auth => !auth.unauthorized
)

const selectPlayers = state => get(state, 'entities.players')
const selectCurrentPlayerId = state => get(state, 'auth.selectAuth')
const selectCurrentPlayer = createSelector(
  selectPlayers,
  selectCurrentPlayerId,
  (players, playerId) => {
    return players[playerId] || {}
  }
)

export {
  selectIsAuthenticated,
  selectPlayers,
  selectCurrentPlayerId,
  selectCurrentPlayer
}
