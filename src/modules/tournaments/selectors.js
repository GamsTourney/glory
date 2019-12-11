import get from 'lodash/get'

const selectTournaments = state => get(state, 'entities.tournaments')

export { selectTournaments }
