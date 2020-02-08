import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTournamentCollection } from 'modules/tournaments/hooks'
import { fetchGames, fetchGame } from './actions'
import { selectGame, selectTournamentGames } from './selectors'

const useTournamentGames = () =>
  useTournamentCollection(fetchGames, selectTournamentGames)

const useGame = gameId => {
  const dispatch = useDispatch()
  const match = useSelector(state => selectGame(state, { gameId }))

  useEffect(() => {
    if (gameId) {
      dispatch(fetchGame(gameId))
    }
  }, [dispatch, gameId])

  return match
}

export { useGame, useTournamentGames }
