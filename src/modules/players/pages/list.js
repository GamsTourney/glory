import React from 'react'
import { Link } from 'react-router-dom'
import { Grid, Paper, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

import { useTournamentPlayers } from 'modules/players/hooks'
import PlayerAvatar from 'modules/players/components/avatar'

const useStyles = makeStyles(theme => ({
  link: {
    width: '100%',
    textDecoration: 'none'
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  playerName: {
    fontSize: '1.25em',
    marginLeft: '20px'
  },
  title: {
    textAlign: 'center'
  }
}))

const PlayerList = () => {
  const classes = useStyles()
  const players = useTournamentPlayers()

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography className={classes.title} variant="h5">
          Players
        </Typography>
      </Grid>
      {players.map(p => {
        return (
          <Grid key={p.id} item xs={12} md={6}>
            <Link className={classes.link} to={`/players/${p.id}`}>
              <Paper className={classes.paper}>
                <PlayerAvatar playerId={p.id} size="medium" />
                <div className={classes.playerName}>{p.name}</div>
              </Paper>
            </Link>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default PlayerList
