import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { selectCurrentPlayerId, selectCurrentPlayer } from './selectors'
import { fetchPlayer } from './actions'

const useCurrentPlayer = () => {
  const dispatch = useDispatch()
  const currentPlayerId = useSelector(selectCurrentPlayerId)
  const currentPlayer = useSelector(selectCurrentPlayer)

  useEffect(() => {
    if (currentPlayerId) {
      dispatch(fetchPlayer(currentPlayerId))
    }
  }, [dispatch, currentPlayerId])

  return currentPlayer
}

export { useCurrentPlayer }