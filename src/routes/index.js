import TournamentDashboard from 'modules/tournaments/pages/dashboard'
import AuthRedirect from 'modules/api/auth'
import GameRoutes from 'modules/games/routes'
import JudgesRoutes from 'modules/judges/routes'
import MatchRoutes from 'modules/matches/routes'
import PlayerRoutes from 'modules/players/routes'
import ReportRoutes from 'modules/reports/routes'
import TournamentRoutes from 'modules/tournaments/routes'

export default [
  {
    path: '/',
    content: TournamentDashboard,
    exact: true
  },
  {
    path: '/auth/:token',
    content: AuthRedirect,
    exact: true
  },
  ...GameRoutes,
  ...JudgesRoutes,
  ...MatchRoutes,
  ...PlayerRoutes,
  ...ReportRoutes,
  ...TournamentRoutes
]
