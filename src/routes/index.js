import GameRoutes from 'modules/games/routes'
import JudgesRoutes from 'modules/judges/routes'
import MatchRoutes from 'modules/matches/routes'
import PlayerRoutes from 'modules/players/routes'
import TournamentRoutes from 'modules/tournaments/routes'

export default [
  ...GameRoutes,
  ...JudgesRoutes,
  ...MatchRoutes,
  ...PlayerRoutes,
  ...TournamentRoutes
]
