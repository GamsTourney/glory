import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import Paper from '@material-ui/core/Paper'
import { Chart } from 'react-google-charts'

import { useTournamentGames } from 'modules/games/hooks'
import { useTournamentPlayers } from 'modules/players/hooks'
import { useTournamentMatches } from 'modules/matches/hooks'
import { selectTimelineData } from 'modules/matches/selectors'

const useStyles = makeStyles(theme => ({
  paper: {
    paddingTop: theme.spacing(4),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4)
  },
  paperHeading: {
    color: theme.palette.text.secondary,
    fontSize: '1.25em',
    fontWeight: 'bold',
    marginBottom: '24px'
  }
}))

const TournamentSchedule = () => {
  const classes = useStyles()
  useTournamentGames()
  useTournamentPlayers()
  useTournamentMatches()
  const schedule = useSelector(selectTimelineData)

  if (schedule.length <= 0) {
    return null
  }

  console.log(schedule)

  return (
    <Paper className={classes.paper}>
      <div className={classes.paperHeading}>Tournament Schedule</div>
      <Chart
        chartType="Timeline"
        columns={[
          { id: 'Player', type: 'string' },
          { id: 'Game', type: 'string' },
          { id: 'Start', type: 'date' },
          { id: 'End', type: 'date' }
        ]}
        options={{
          timeline: {
            showBarLabels: false
          },
          hAxis: {
            format: 'h:mm'
          },
          theme: 'material'
        }}
        rows={schedule}
        height="400px"
        width="100%"
      />
    </Paper>
  )
}

export default TournamentSchedule
