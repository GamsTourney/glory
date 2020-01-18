import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useTournamentCollection } from 'modules/tournaments/hooks'
import {
  selectCurrentPlayerId,
  selectCurrentPlayer,
  selectTournamentPlayers
} from './selectors'
import { fetchPlayer, fetchPlayers } from './actions'

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

const useTournamentPlayers = () =>
  useTournamentCollection(fetchPlayers, selectTournamentPlayers)

export { useCurrentPlayer, useTournamentPlayers }
