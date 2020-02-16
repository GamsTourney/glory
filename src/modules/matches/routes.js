import Detail from './pages/detail'
import Scores from './pages/score'

export default [
  {
    path: '/matches/:matchId',
    content: Detail,
    exact: true
  },
  {
    path: '/matches/:matchId/score',
    content: Scores,
    exact: true,
    admin: true
  }
]
