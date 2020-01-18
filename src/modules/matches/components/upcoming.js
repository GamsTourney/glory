import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

import { useTournamentMatches } from 'modules/matches/hooks'
import MatchCard from './card'

const useStyles = makeStyles(() => ({
  upcoming: {
    height: '350px',
    overflow: 'scroll'
  }
}))

const UpcomingMatches = () => {
  const classes = useStyles()
  const matches = useTournamentMatches()
  return (
    <div className={classes.upcoming}>
      {matches.map(m => (
        <MatchCard match={m} key={m.id} />
      ))}
    </div>
  )
}

export default UpcomingMatches
