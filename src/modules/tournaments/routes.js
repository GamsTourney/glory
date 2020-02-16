import TournamentDashboard from './pages/dashboard'
import TournamentManage from './pages/manage'
import TournamentSchedule from './pages/schedule'

export default [
  {
    path: '/tournaments',
    content: TournamentManage,
    exact: true
  },
  {
    path: '/schedule',
    content: TournamentSchedule,
    exact: true
  },
  {
    path: '/overview',
    content: TournamentDashboard,
    exact: true
  }
]
