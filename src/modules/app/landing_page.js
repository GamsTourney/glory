import React from 'react'
import { Redirect } from 'react-router-dom'

import { useCurrentPlayer } from 'modules/players/hooks'

const LandingPage = () => {
  const currentPlayer = useCurrentPlayer()
  if (!currentPlayer) {
    return null
  }
  const { admin } = currentPlayer
  const redirect = admin ? '/overview' : `/players/${currentPlayer.id}`

  return <Redirect to={redirect} />
}

export default LandingPage
