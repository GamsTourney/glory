import React from 'react'
import PropTypes from 'prop-types'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { withRouter, Link } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import { useGame } from 'modules/games/hooks'
import { useMatch } from 'modules/matches/hooks'
import MatchRankScore from '../components/score/rank'
import MatchManualScore from '../components/score/manual'
import { SCORE_TYPES } from '../constants'

const useStyles = makeStyles(() => ({
  heading: {
    textAlign: 'center',
    marginBottom: '12px'
  },
  link: {
    textDecoration: 'none'
  }
}))

const MatchScore = ({ match: location }) => {
  const classes = useStyles()
  const matchId = get(location, 'params.matchId')
  const match = useMatch(matchId)
  const { gameId } = match
  const game = useGame(gameId)
  const { name: gameName } = game

  if (isEmpty(match)) {
    return null
  }

  return (
    <>
      <Typography className={classes.heading} variant="h5">
        <Link className={classes.link} to={`/matches/${matchId}`}>
          {gameName}
        </Link>
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
