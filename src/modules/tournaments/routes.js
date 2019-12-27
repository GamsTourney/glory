import TournamentDashboard from './pages/dashboard'
import TournamentManage from './pages/manage'

export default [
  {
    path: '/tournaments',
    content: TournamentManage,
    exact: true
  },
  {
    path: '/tournaments/:id',
    content: TournamentDashboard,
    exact: true
  }
]
