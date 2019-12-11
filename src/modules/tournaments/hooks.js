import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchTournaments } from './actions'
import { selectTournaments } from './selectors'

const useTournaments = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectTournaments)

  useEffect(() => {
    dispatch(fetchTournaments())
  }, [dispatch])

  return users
}

export { useTournaments }
