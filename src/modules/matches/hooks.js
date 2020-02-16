import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTournamentCollection } from 'modules/tournaments/hooks'
import { fetchMatch, fetchPlayerMatches, fetchMatches } from './actions'
import {
  selectMatch,
  selectPlayerMatches,
  selectTournamentMatches
} from './selectors'

const useTournamentMatches = () =>
  useTournamentCollection(fetchMatches, selectTournamentMatches)

const usePlayerMatches = playerId => {
  const dispatch = useDispatch()
  const matches = useSelector(state => selectPlayerMatches(state, { playerId }))

  useEffect(() => {
    if (playerId) {
      dispatch(fetchPlayerMatches(playerId))
    }
  }, [dispatch, playerId])

  return matches
}

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

export { useMatch, usePlayerMatches, useTournamentMatches }
