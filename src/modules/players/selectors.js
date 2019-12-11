import { createSelector } from 'reselect'
import get from 'lodash/get'

const selectPlayers = state => get(state, 'entities.players')

const selectCurrentPlayerId = state => get(state, 'auth.currentUserId')

const selectCurrentPlayer = createSelector(
  selectPlayers,
  selectCurrentPlayerId,
  (players, playerId) => {
    console.log(players[playerId])
    return players[playerId] || {}
  }
)

export { selectPlayers, selectCurrentPlayerId, selectCurrentPlayer }
