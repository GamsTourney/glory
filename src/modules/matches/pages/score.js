import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'

import { useMatch } from 'modules/matches/hooks'
import MatchRankScore from '../components/score/rank'
import MatchManualScore from '../components/score/manual'
import { SCORE_TYPES } from '../constants'

const MatchScore = ({ match: location }) => {
  const matchId = get(location, 'params.matchId')
  const match = useMatch(matchId)

  if (isEmpty(match)) {
    return null
  }

  return match.scoreType === SCORE_TYPES.RANK ? (
    <MatchRankScore match={match} />
  ) : (
    <MatchManualScore match={match} />
  )
}

MatchScore.propTypes = {
  match: PropTypes.shape({ scoreType: PropTypes.string })
}

MatchScore.defaultProps = {
  match: null
}

export default withRouter(MatchScore)
