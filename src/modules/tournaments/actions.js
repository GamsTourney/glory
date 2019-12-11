import { fetchCollection, fetchItem } from 'modules/api/actions'

const fetchTournaments = () => fetchCollection('tournaments')
const fetchTournament = tournamentId => fetchItem('tournaments', tournamentId)

export { fetchTournaments, fetchTournament }
