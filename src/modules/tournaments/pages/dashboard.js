import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    color: theme.palette.text.secondary
  }
}))

const TournamentDashboard = () => {
  const classes = useStyles()

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Paper className={classes.paper}>Scoreboard</Paper>
      </Grid>
      <Grid item xs={6} md={4}>
        <Paper className={classes.paper}>Upcoming Matches</Paper>
      </Grid>
      <Grid item xs={6} md={4}>
        <Paper className={classes.paper}>Statboard</Paper>
      </Grid>
      <Grid item xs={6} md={4}>
        <Paper className={classes.paper}>Statboard</Paper>
      </Grid>
      <Grid item xs={6} md={4}>
        <Paper className={classes.paper}>Statboard</Paper>
      </Grid>
    </Grid>
  )
}

export default TournamentDashboard
