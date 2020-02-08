import Scores from './pages/score'

export default [
  {
    path: '/matches/:matchId/score',
    content: Scores,
    exact: true
  }
]
