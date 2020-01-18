import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import { useTournamentGames } from 'modules/games/hooks'
import { useTournamentPlayers } from 'modules/players/hooks'
import TournamentStandings from 'modules/standings/components/graph'
import UpcomingMatches from 'modules/matches/components/upcoming'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  },
  paperHeading: {
    color: theme.palette.text.secondary,
    fontSize: '1.25em',
    fontWeight: 'bold',
    marginBottom: '12px'
  }
}))

const TournamentDashboard = () => {
  const classes = useStyles()
  useTournamentGames()
  useTournamentPlayers()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Paper className={classes.paper}>
          <div className={classes.paperHeading}>Standings</div>
          <TournamentStandings />
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={4}>
        <Paper className={classes.paper}>
          <div className={classes.paperHeading}>Upcoming Matches</div>
          <UpcomingMatches />
        </Paper>
      </Grid>
      <Grid item xs={6} md={4}>
        <Paper className={classes.paper}>
          <div className={classes.paperHeading}>Statboard</div>
        </Paper>
      </Grid>
      <Grid item xs={6} md={4}>
        <Paper className={classes.paper}>
          <div className={classes.paperHeading}>Statboard</div>
        </Paper>
      </Grid>
      <Grid item xs={6} md={4}>
        <Paper className={classes.paper}>
          <div className={classes.paperHeading}>Statboard</div>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default TournamentDashboard
