import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectActiveTournamentId } from 'modules/tournaments/selectors'

const useTournamentCollection = (action, selector) => {
  const dispatch = useDispatch()
  const tournamentId = selectActiveTournamentId
  const metrics = useSelector(state => selector(state, { tournamentId }))

  useEffect(() => {
    if (tournamentId) {
      dispatch(action(tournamentId))
    }
  }, [action, dispatch, tournamentId])

  return metrics
}

export { useTournamentCollection }
