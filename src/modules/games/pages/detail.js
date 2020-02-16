import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import get from 'lodash/get'
import filter from 'lodash/filter'

import { useTournamentPlayers } from 'modules/players/hooks'
import { useTournamentMatches } from 'modules/matches/hooks'
import { useGame } from 'modules/games/hooks'
import MatchList from 'modules/matches/components/list'

const useStyles = makeStyles(theme => ({
  details: {
    padding: theme.spacing(1),
    textAlign: 'left',
    whiteSpace: 'pre-wrap'
  },
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

const GameDetail = ({ match }) => {
  const classes = useStyles()
  useTournamentPlayers()
  const gameId = Number(get(match, 'params.gameId'))
  const game = useGame(gameId)
  const matches = useTournamentMatches()
  const { details, imgUrl } = game
  const gameMatches = filter(matches, { gameId })

  return (
    <Grid container direction="row" spacing={2}>
      <Grid item xs={12} md={7}>
        <div>
          {imgUrl && <img alt="gamePicture" src={imgUrl} width="100%" />}
        </div>
        {details && (
          <Paper className={classes.paper}>
            <div className={classes.paperHeading}>Scoring</div>
            <div className={classes.details}>{details}</div>
          </Paper>
        )}
      </Grid>
      <Grid item xs={12} md={5}>
        <Paper className={classes.paper}>
          <div className={classes.paperHeading}>Matches</div>
          <MatchList matches={gameMatches} />
        </Paper>
      </Grid>
    </Grid>
  )
}

GameDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      gameId: PropTypes.string
    })
  }).isRequired
}

export default withRouter(GameDetail)
