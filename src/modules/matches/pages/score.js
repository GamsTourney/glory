import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter, Link } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import { getGameName } from 'modules/games/helpers'
import { useGame } from 'modules/games/hooks'
import { useTournamentMatches, useMatch } from 'modules/matches/hooks'
import { selectPreviousMatch, selectNextMatch } from 'modules/matches/selectors'
import { selectIsAdmin } from 'modules/players/selectors'
import MatchRankScore from '../components/score/rank'
import MatchManualScore from '../components/score/manual'
import { SCORE_TYPES } from '../constants'

const useStyles = makeStyles(() => ({
  heading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    marginBottom: '12px'
  },
  link: {
    textDecoration: 'none'
  }
}))

const MatchScore = ({ match: location }) => {
  const isAdmin = useSelector(selectIsAdmin)
  useTournamentMatches()
  const classes = useStyles()
  const matchId = get(location, 'params.matchId')
  const match = useMatch(matchId)
  const { gameId } = match
  const game = useGame(gameId)
  const gameName = getGameName(match, game)
  const previousMatch = useSelector(state =>
    selectPreviousMatch(state, { matchId })
  )
  const nextMatch = useSelector(state => selectNextMatch(state, { matchId }))

  if (isEmpty(match)) {
    return null
  }

  if (!isAdmin) {
    return null
  }

  return (
    <>
      <Typography className={classes.heading} variant="h5">
        {previousMatch ? (
          <Link
            className={classes.link}
            to={`/matches/${previousMatch.id}/score`}
          >
            <Button variant="contained" color="primary">
              PREV
            </Button>
          </Link>
        ) : (
          <span />
        )}
        <Link className={classes.link} to={`/matches/${matchId}`}>
          {gameName}
        </Link>
        {nextMatch ? (
          <Link className={classes.link} to={`/matches/${nextMatch.id}/score`}>
            <Button variant="contained" color="primary">
              NEXT
            </Button>
          </Link>
        ) : (
          <span />
        )}
      </Typography>
      {match.scoreType === SCORE_TYPES.RANK ? (
        <MatchRankScore match={match} />
      ) : (
        <MatchManualScore match={match} />
      )}
    </>
  )
}

MatchScore.propTypes = {
  match: PropTypes.shape({
    gameId: PropTypes.number,
    scoreType: PropTypes.string
  })
}

MatchScore.defaultProps = {
  match: null
}

export default withRouter(MatchScore)
