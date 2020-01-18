import React from 'react'

import { useTournaments } from 'modules/tournaments/hooks'

const TournamentManage = () => {
  const tournaments = useTournaments()
  return tournaments.map(t => <div key={t.id}>{t.name}</div>)
}

export default TournamentManage
