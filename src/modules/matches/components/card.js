import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import get from 'lodash/get'

import { selectGame } from 'modules/games/selectors'
import PlayerAvatar from 'modules/players/components/avatar'

const useStyles = makeStyles(theme => ({
  game: {
    fontSize: '.9em',
    fontColor: 'gray',
    marginBottom: '8px'
  },
  link: {
    textDecoration: 'none'
  },
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

const MatchCard = ({ match }) => {
  const classes = useStyles()
  const { id, gameId } = match
  const game = useSelector(state => selectGame(state, { gameId }))
  const { name: gameName } = game
  const mcs = get(match, 'matchCompetitors', [])

  return (
    <Link to={`/matches/${id}`} className={classes.link}>
      <Paper className={classes.paper} variant="outlined">
        <div className={classes.game}>{gameName}</div>
        {mcs.map(mc => (
          <PlayerAvatar
            key={mc.playerId}
            playerId={mc.playerId}
            points={mc.points}
            isWinner={mc.position === 0}
          />
        ))}
      </Paper>
    </Link>
  )
}

MatchCard.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.number,
    gameId: PropTypes.number
  }).isRequired
}

export default MatchCard
