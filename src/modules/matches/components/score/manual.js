import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, IconButton } from '@material-ui/core'
import { Add, Remove } from '@material-ui/icons'
import orderBy from 'lodash/orderBy'
import get from 'lodash/get'

import { selectPlayer } from 'modules/players/selectors'
import { useTournamentPlayers } from 'modules/players/hooks'
import { updateMatch } from 'modules/matches/actions'
import PlayerAvatar from 'modules/players/components/avatar'
import { COLOR_WHEEL } from 'constants/colors'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1, 2),
    marginBottom: '12px',
    display: 'flex',
    alignItems: 'center',
    borderWidth: '1.5px'
  },
  player: {
    marginLeft: '12px',
    flexGrow: 1
  },
  scoreArea: {
    display: 'flex',
    alignItems: 'center'
  },
  score: {
    fontSize: '1.75em'
  }
}))

const ManualScoreCard = ({ matchCompetitor }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { id, matchId, playerId, points, team } = matchCompetitor
  const player = useSelector(state => selectPlayer(state, { playerId }))
  const { name } = player

  const sendScores = (mId, mcs) =>
    dispatch(updateMatch(mId, { match_competitors_attributes: mcs }))

  const handleAddPoints = pointsChange => {
    const newPoints = points + pointsChange
    if (newPoints >= 0) {
      sendScores(matchId, [{ id, points: newPoints }])
    }
  }
  const handlePlus = () => handleAddPoints(1)
  const handleSubtract = () => handleAddPoints(-1)
  const borderColor = get(COLOR_WHEEL, team)

  return (
    playerId && (
      <Paper
        key={playerId}
        className={classes.paper}
        variant="outlined"
        style={{ borderColor }}
      >
        <PlayerAvatar playerId={playerId} />
        <span className={classes.player}>{name}</span>
        <div className={classes.scoreArea}>
          <IconButton onClick={handleSubtract}>
            <Remove />
          </IconButton>
          <span className={classes.score}>{points}</span>
          <IconButton onClick={handlePlus}>
            <Add />
          </IconButton>
        </div>
      </Paper>
    )
  )
}

const MatchManualScore = ({ match }) => {
  useTournamentPlayers()
  const { matchCompetitors } = match
  const ordered = orderBy(matchCompetitors, ['points', 'id'], ['desc', 'desc'])
  return ordered.map(mc => <ManualScoreCard matchCompetitor={mc} />)
}

export default MatchManualScore
