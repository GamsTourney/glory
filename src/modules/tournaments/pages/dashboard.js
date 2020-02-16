import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import isEmpty from 'lodash/isEmpty'
import orderBy from 'lodash/orderBy'

import { useTournamentGames } from 'modules/games/hooks'
import { useTournamentPlayers } from 'modules/players/hooks'
import { useTournamentMatches } from 'modules/matches/hooks'
import { selectUpcomingMatches } from 'modules/matches/selectors'
import { getAttachmentUrl } from 'utils/attachments'
import TournamentStandings from 'modules/standings/components/graph'
import MatchList from 'modules/matches/components/list'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  },
  paperHeading: {
    color: theme.palette.text.secondary,
    fontSize: '1.25em',
    fontWeight: 'bold',
    marginBottom: '12px'
  },
  resultPicture: {
    padding: theme.spacing(1),
    width: '250px'
  },
  resultSection: {
    padding: theme.spacing(2),
    display: 'flex',
    height: '200px',
    overflowY: 'hidden',
    overflowX: 'scroll'
  }
}))

const TournamentDashboard = () => {
  const classes = useStyles()
  useTournamentPlayers()
  const allMatches = useTournamentMatches()
  const games = useTournamentGames()
  const matches = useSelector(state => selectUpcomingMatches(state))
  const orderedMatches = orderBy(allMatches, ['endTime'], ['desc'])

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
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <div className={classes.paperHeading}>Results</div>
          <div className={classes.resultSection}>
            {orderedMatches.map(m => {
              const { resultPicture } = m
              if (!resultPicture) {
                return null
              }
              return (
                <Link key={m.id} to={`/matches/${m.id}`}>
                  <img
                    alt={m.id}
                    className={classes.resultPicture}
                    src={getAttachmentUrl(resultPicture)}
                  />
                </Link>
              )
            })}
          </div>
        </Paper>
      </Grid>
    </Grid>
  )
}

export default TournamentDashboard
