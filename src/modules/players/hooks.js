import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useTournamentCollection } from 'modules/tournaments/hooks'
import {
  selectCurrentPlayerId,
  selectCurrentPlayer,
  selectPlayer,
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

const usePlayer = playerId => {
  const dispatch = useDispatch()
  const player = useSelector(selectPlayer, { playerId })

  useEffect(() => {
    if (playerId) {
      dispatch(fetchPlayer(playerId))
    }
  }, [dispatch, playerId])

  return player
}

const useTournamentPlayers = () =>
  useTournamentCollection(fetchPlayers, selectTournamentPlayers)

export { useCurrentPlayer, usePlayer, useTournamentPlayers }
