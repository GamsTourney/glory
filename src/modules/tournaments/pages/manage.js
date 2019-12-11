import React from 'react'

import { useTournaments } from 'modules/tournaments/hooks'

const TournamentManage = () => {
  const tournaments = useTournaments()
  console.log(tournaments)
  return <div>Tournament Manage Page</div>
}

export default TournamentManage
