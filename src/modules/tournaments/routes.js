import TournamentDashboard from './pages/dashboard'
import TournamentManage from './pages/manage'

export default [
  {
    path: '/tournaments',
    content: TournamentManage,
    exact: true
  },
  {
    path: '/',
    content: TournamentDashboard,
    exact: true
  }
]
