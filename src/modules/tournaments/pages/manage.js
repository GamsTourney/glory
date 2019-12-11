import React from 'react'

import { useTournaments } from 'modules/tournaments/hooks'
import { useTournamentMatches } from 'modules/matches/hooks'
import { useCurrentPlayer } from 'modules/players/hooks'

const TournamentManage = () => {
  const tournaments = useTournaments()
  useCurrentPlayer()
  useTournamentMatches()
  return tournaments.map(t => <div key={t.id}>{t.name}</div>)
}

export default TournamentManage
