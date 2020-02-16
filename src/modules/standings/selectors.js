import { createSelector } from 'reselect'
import { createPropGetter } from 'selectors/helpers'
import get from 'lodash/get'
import find from 'lodash/find'

import { selectTournamentPlayers } from 'modules/players/selectors'

const selectTournamentStandings = createSelector(
  createPropGetter('matches'),
  selectTournamentPlayers,
  (matches, players) => {
    const standings = []
    const scores = {}
    matches.forEach(m => {
      const { matchCompetitors } = m
      matchCompetitors.forEach(mc => {
        const { playerId, points } = mc
        if (scores[playerId]) {
          scores[playerId] += points
        } else {
          scores[playerId] = points
        }
      })
    })
    Object.keys(scores).forEach(playerId => {
      const player = find(players, { id: Number(playerId) })
      const name = get(player, 'name', '')
      const avatar = get(player, 'steam.avatar')
      standings.push({
        id: playerId,
        score: scores[playerId],
        name: name.split(' ')[0],
        playerId: Number(playerId),
        avatar
      })
    })
    return standings
  }
)

export { selectTournamentStandings }
