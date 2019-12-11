import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTournaments } from './actions'
import { selectActiveTournamentId, selectTournamentsList } from './selectors'

const useTournamentCollection = (action, selector) => {
  const dispatch = useDispatch()
  const tournamentId = useSelector(selectActiveTournamentId)
  const items = useSelector(state => selector(state, { tournamentId }))

  useEffect(() => {
    if (tournamentId) {
      dispatch(action(tournamentId))
    }
  }, [action, dispatch, tournamentId])

  return items
}

const useTournaments = () => {
  const dispatch = useDispatch()
  const tournaments = useSelector(selectTournamentsList)

  useEffect(() => {
    dispatch(fetchTournaments())
  }, [dispatch])

  return tournaments
}

export { useTournamentCollection, useTournaments }
