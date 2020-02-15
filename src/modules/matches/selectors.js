import { createSelector } from 'reselect'
import get from 'lodash/get'
import filter from 'lodash/filter'
import find from 'lodash/find'
import orderBy from 'lodash/orderBy'

import { createPropGetter } from 'selectors/helpers'
import { selectActiveTournamentId } from 'modules/tournaments/selectors'
import { selectTournamentPlayers } from 'modules/players/selectors'
import { selectTournamentGames } from 'modules/games/selectors'
import { getGameName } from 'modules/games/helpers'

const selectMatches = state => get(state, 'entities.matches')

const selectMatch = createSelector(
  selectMatches,
  createPropGetter('matchId'),
  (matches, matchId) => get(matches, matchId, {})
)

const selectMatchPlayers = createSelector(
  selectMatch,
  selectTournamentPlayers,
  (match, players) => {
    const { matchCompetitors } = match
    const ordered = orderBy(matchCompetitors, ['points'], ['desc'])
    const matchPlayers = ordered.map(mc => {
      const { playerId } = mc
      const player = find(players, { id: playerId }) || {}
      return { ...player, matchCompetitorId: mc.id }
    })
    return matchPlayers
  }
)

const selectTournamentMatches = createSelector(
  selectMatches,
  selectActiveTournamentId,
  createPropGetter('tournamentId'),
  (matches, activeId, tournamentId) => {
    const tId = tournamentId || activeId
    return filter(matches, m => m.tournamentId === tId && !m.hidden)
  }
)

const selectTournamentMatchesByPlayer = createSelector(
  selectTournamentMatches,
  matches => {
    const schedule = {}
    matches.forEach(match => {
      const { matchCompetitors } = match
      matchCompetitors.forEach(competitor => {
        const { playerId, team } = competitor
        const playerMatch = { team, ...match }
        if (schedule[playerId]) {
          schedule[playerId].push(playerMatch)
        } else {
          schedule[playerId] = [playerMatch]
        }
      })
    })
    return schedule
  }
)

const selectTimelineData = createSelector(
  selectTournamentPlayers,
  selectTournamentGames,
  selectTournamentMatchesByPlayer,
  (players, games, playerMatches) => {
    const rows = []
    Object.keys(playerMatches).forEach(playerId => {
      const player = find(players, p => `${p.id}` === `${playerId}`)
      playerMatches[playerId].forEach(match => {
        if (!match.hidden) {
          const game = find(games, g => `${g.id}` === `${match.gameId}`)
          const row = [
            player.name,
            getGameName(match, game),
            new Date(match.startTime),
            new Date(match.endTime)
          ]
          rows.push(row)
        }
      })
    })
    return rows
  }
)

export {
  selectMatches,
  selectMatch,
  selectMatchPlayers,
  selectTournamentMatches,
  selectTimelineData
}
