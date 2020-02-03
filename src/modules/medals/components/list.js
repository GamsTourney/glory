import React from 'react'
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles(theme => ({
  upcoming: {
    height: '250px',
    overflow: 'scroll'
  },
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

const MEDALS = [
  { id: 0, name: 'Rob', award: 'Most Kills in Unreal Tournament' },
  { id: 1, name: 'Rob', award: 'Top Play' },
  { id: 2, name: 'Rob', award: 'Scootinest' },
  { id: 3, name: 'Rob', award: 'Tootinest' },
  { id: 4, name: 'Nick', award: 'Gams 2020 Champion' }
]

const MedalList = () => {
  const classes = useStyles()
  return (
    <div className={classes.upcoming}>
      {MEDALS.map(m => (
        <Paper key={m.id} className={classes.paper} variant="outlined">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
          >
            <Grid item xs={2} md={1}>
              <EmojiEventsIcon />
            </Grid>
            <Grid item xs={10} md={11}>
              {m.name} has claimed {m.award}!
            </Grid>
          </Grid>
        </Paper>
      ))}
    </div>
  )
}

export default MedalList
