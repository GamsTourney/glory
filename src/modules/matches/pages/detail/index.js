import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Button, Grid, Hidden, Paper } from '@material-ui/core'
import { Assignment } from '@material-ui/icons'
import get from 'lodash/get'

import { useGame } from 'modules/games/hooks'
import { useMatch } from 'modules/matches/hooks'
import { getAttachmentUrl } from 'utils/attachments'
import { useCurrentPlayer, useTournamentPlayers } from 'modules/players/hooks'
import ReportButton from 'modules/matches/components/upload'
import MatchPlayers from './players'

const useStyles = makeStyles(theme => {
  const paper = {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
    textAlign: 'center'
  }

  return {
    button: {
      marginRight: '12px',
      display: 'flex',
      alignItems: 'center'
    },
    buttonIcon: {
      marginRight: '8px'
    },
    buttonToolbar: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginLeft: 'auto'
    },
    details: {
      padding: theme.spacing(1),
      textAlign: 'left',
      whiteSpace: 'pre-wrap'
    },
    gamePicture: {
      marginTop: theme.spacing(1),
      padding: theme.spacing(1)
    },
    link: {
      textDecoration: 'none'
    },
    paper,
    paperHeading: {
      color: theme.palette.text.secondary,
      fontSize: '1.25em',
      fontWeight: 'bold',
      marginBottom: '12px'
    },
    title: {
      fontSize: '1.5em'
    }
  }
})

const MatchDetail = ({ match: location }) => {
  const classes = useStyles()
  useTournamentPlayers()
  const currentPlayer = useCurrentPlayer()
  const { admin } = currentPlayer
  const matchId = get(location, 'params.matchId')
  const gameMatch = useMatch(matchId) || {}
  const { gameId, matchCompetitors } = gameMatch
  const game = useGame(gameId)
  const { details, imgUrl, name: gameName } = game
  const resultImg = get(gameMatch, 'resultPicture')

  return (
    <>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Hidden xsDown>
          <div className={classes.title}>{gameName}</div>
        </Hidden>
        {admin && (
          <div className={classes.buttonToolbar}>
            <Link to={`/matches/${matchId}/score`} className={classes.link}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                <Assignment className={classes.buttonIcon} />
                Score
              </Button>
            </Link>
            <ReportButton matchId={matchId} />
          </div>
        )}
      </Grid>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} md={7}>
          <Link to={`/games/${gameId}`} className={classes.link}>
            <div className={classes.gamePicture}>
              {imgUrl && <img alt="gamePicture" src={imgUrl} width="100%" />}
            </div>
          </Link>
          <Paper className={classes.paper}>
            <div className={classes.paperHeading}>Competitors</div>
            <MatchPlayers matchCompetitors={matchCompetitors} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          {details && (
            <Paper className={classes.paper}>
              <div className={classes.paperHeading}>Scoring</div>
              <div className={classes.details}>{details}</div>
            </Paper>
          )}
          {resultImg && (
            <Paper className={classes.paper}>
              <div className={classes.paperHeading}>Result Picture</div>
              <img
                alt="attachment"
                src={getAttachmentUrl(resultImg)}
                width="100%"
              />
            </Paper>
          )}
        </Grid>
      </Grid>
    </>
  )
}

MatchDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      matchId: PropTypes.string
    })
  }).isRequired
}

export default withRouter(MatchDetail)
