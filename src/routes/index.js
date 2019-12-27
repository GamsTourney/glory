import JudgesRoutes from 'modules/judges/routes'
import PlayerRoutes from 'modules/players/routes'
import TournamentRoutes from 'modules/tournaments/routes'

export default [...JudgesRoutes, ...PlayerRoutes, ...TournamentRoutes]
