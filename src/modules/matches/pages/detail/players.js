import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import groupBy from 'lodash/groupBy'

import PlayerAvatar from 'modules/players/components/avatar'

const useStyles = makeStyles(() => ({
  centered: {
    display: 'inline-flex',
    alignItems: 'center',
    textAlign: 'center'
  }
}))

const MatchPlayers = ({ matchCompetitors }) => {
  const classes = useStyles()
  const teams = groupBy(matchCompetitors, 'team')
  const teamKeys = Object.keys(teams)

  return (
    <div className={classes.centered}>
      {teamKeys.map((t, i) => {
        const team = teams[t]
        const teamAvatars = team.map((mc, idx) => (
          <div className={classes.centered} key={mc.playerId}>
            <PlayerAvatar
              playerId={mc.playerId}
              isWinner={mc.position === 0}
              size="medium"
            />
            {teamKeys.length === 1 && idx < team.length - 1 && (
              <div
                className={classes.centered}
                style={{ margin: '0px 16px 0px 10px' }}
              >
                VS
              </div>
            )}
          </div>
        ))
        return (
          <Fragment key={i}>
            <div classes={classes.centered}>{teamAvatars}</div>
            {i < teamKeys.length - 1 && (
              <div
                className={classes.centered}
                style={{ margin: '0px 16px 0px 10px' }}
              >
                VS
              </div>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}

MatchPlayers.propTypes = {
  matchCompetitors: PropTypes.arrayOf(PropTypes.shape({}))
}

MatchPlayers.defaultProps = {
  matchCompetitors: []
}

export default MatchPlayers
