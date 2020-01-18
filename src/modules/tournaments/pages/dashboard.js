import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import LinearProgress from '@material-ui/core/LinearProgress'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'

import { useTournamentGames } from 'modules/games/hooks'
import { useTournamentPlayers } from 'modules/players/hooks'
import { useTournamentMatches } from 'modules/matches/hooks'
import TournamentStandings from 'modules/standings/components/graph'
import MatchList from 'modules/matches/components/list'
import GameBreakdown from 'modules/matches/components/graphs/game_breakdown'
import MedalList from 'modules/medals/components/list'

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
  useTournamentPlayers()
  const matches = useTournamentMatches()
  const games = useTournamentGames()
  const completedMatches = filter(matches, m => m.completed).length
  const totalMatches = matches.length
  const completed = Math.floor((completedMatches / totalMatches) * 100)

  if (isEmpty(matches) || isEmpty(games)) {
    return null
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Paper className={classes.paper}>
          <div className={classes.paperHeading}>Standings</div>
          <TournamentStandings />
        </Paper>
      </Grid>
      <Grid item xs={12} md={4}>
        <Paper className={classes.paper}>
          <div className={classes.paperHeading}>Upcoming Matches</div>
          <MatchList matches={matches} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <div className={classes.paperHeading}>Medals</div>
          <MedalList />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <div className={classes.paperHeading}>Available Points</div>
          <GameBreakdown matches={matches} games={games} />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default TournamentDashboard
