import GameList from './pages/list'
import GameDetail from './pages/detail'

export default [
  {
    path: '/games',
    content: GameList,
    exact: true
  },
  {
    path: '/games/:gameId',
    content: GameDetail,
    exact: true
  }
]
