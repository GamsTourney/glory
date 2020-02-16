import Login from './pages/login'
import PlayerList from './pages/list'
import PlayerDetail from './pages/detail'

export default [
  {
    path: '/login',
    content: Login,
    exact: true,
    open: true
  },
  {
    path: '/players',
    content: PlayerList,
    exact: true
  },
  {
    path: '/players/:playerId',
    content: PlayerDetail,
    exact: true
  }
]
