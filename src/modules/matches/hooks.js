import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTournamentCollection } from 'modules/tournaments/hooks'
import { fetchMatch, fetchMatches } from './actions'
import { selectMatch, selectTournamentMatches } from './selectors'

const useTournamentMatches = () =>
  useTournamentCollection(fetchMatches, selectTournamentMatches)

const useMatch = matchId => {
  const dispatch = useDispatch()
  const match = useSelector(state => selectMatch(state, { matchId }))

  useEffect(() => {
    if (matchId) {
      dispatch(fetchMatch(matchId))
    }
  }, [dispatch, matchId])

  return match
}

export { useMatch, useTournamentMatches }
