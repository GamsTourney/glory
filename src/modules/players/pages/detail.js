import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { ActionCableConsumer } from 'react-actioncable-provider'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import get from 'lodash/get'
import filter from 'lodash/filter'
import { apiRecieve } from 'modules/api'

import { selectActiveTournamentId } from 'modules/tournaments/selectors'
import { useTournamentGames } from 'modules/games/hooks'
import { useTournamentPlayers } from 'modules/players/hooks'
import { useTournamentMatches } from 'modules/matches/hooks'
import { selectPlayerMatches } from 'modules/matches/selectors'
import { selectPlayer } from 'modules/players/selectors'
import { getVictories, getPoints } from 'modules/matches/helpers'
import {
  GenreBreakdown,
  PlayerAvatar,
  PointsOverTime
} from 'modules/players/components'
import MatchList from 'modules/matches/components/list'

const useStyles = makeStyles(theme => ({
  avatar: {
    textAlign: 'center',
    marginBottom: theme.spacing(2),
    fontSize: '1.25em'
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  paperHeading: {
    color: theme.palette.text.secondary,
    fontSize: '1.25em',
    fontWeight: 'bold',
    marginBottom: '12px'
  },
  stats: {
    fontSize: '4em',
    textAlign: 'center',
    color: theme.palette.primary.main,
    height: '81px'
  }
}))

const PlayerDetail = ({ match }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  useTournamentPlayers()
  useTournamentMatches()
  const games = useTournamentGames()
  const tournamentId = useSelector(selectActiveTournamentId)
  const playerId = Number(get(match, 'params.playerId'))
  const player = useSelector(state => selectPlayer(state, { playerId }))
  const medals = get(player, 'medals', [])
  const playerMatches = useSelector(state =>
    selectPlayerMatches(state, { playerId })
  )
  const upcoming = filter(playerMatches, { completed: false, tournamentId })
  const completed = filter(playerMatches, { completed: true, tournamentId })
  const victories = getVictories(playerId, playerMatches)
  const points = getPoints(playerId, playerMatches)

  const handleRecieved = m => {
    const json = JSON.parse(m)
    dispatch(apiRecieve('matches', 'get', json))
  }

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={12} md={4}>
        <div className={classes.avatar}>
          <PlayerAvatar playerId={playerId} size="full" />
          <div style={{ marginTop: '12px' }}>{player.name}</div>
        </div>
        <Paper className={classes.paper}>
          <div className={classes.paperHeading}>Upcoming Matches</div>
          <MatchList matches={upcoming} />
        </Paper>
        <Paper className={classes.paper}>
          <div className={classes.paperHeading}>Completed Matches</div>
          <MatchList matches={completed} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={8}>
        <Grid container direction="row" spacing={2}>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <div className={classes.paperHeading}>Genre Breakdown</div>
              <GenreBreakdown
                playerId={playerId}
                matches={playerMatches}
                games={games}
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper className={classes.paper}>
              <div className={classes.paperHeading}>Points</div>
              <div className={classes.stats}>{points}</div>
            </Paper>
            <Paper className={classes.paper}>
              <div className={classes.paperHeading}>Victories</div>
              <div className={classes.stats}>{victories}</div>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <div className={classes.paperHeading}>Point History</div>
              <PointsOverTime playerId={playerId} matches={playerMatches} />
            </Paper>
          </Grid>
          {medals.length > 0 && (
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <div className={classes.paperHeading}>Trophy Cabinet</div>
                {medals.map(m => m.name)}
              </Paper>
            </Grid>
          )}
        </Grid>
      </Grid>
      <ActionCableConsumer
        channel="MatchesChannel"
        onReceived={handleRecieved}
      />
    </Grid>
  )
}

PlayerDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      playerId: PropTypes.string
    })
  }).isRequired
}

export default withRouter(PlayerDetail)
