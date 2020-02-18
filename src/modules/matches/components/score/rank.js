import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import { Paper } from '@material-ui/core'
import { List, arrayMove } from 'react-movable'
import orderBy from 'lodash/orderBy'
import get from 'lodash/get'

import { selectPlayer } from 'modules/players/selectors'
import { useTournamentPlayers } from 'modules/players/hooks'
import { useGame } from 'modules/games/hooks'
import { updateMatch } from 'modules/matches/actions'
import { COLOR_WHEEL } from 'constants/colors'
import PlayerAvatar from 'modules/players/components/avatar'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1, 2),
    marginBottom: '12px',
    borderWidth: '1.5px'
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center'
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
  },
  sortList: {
    paddingLeft: 0
  }
}))

const RankScoreCard = ({ matchCompetitor, dragProps }) => {
  const classes = useStyles()

  const { playerId, points, team } = matchCompetitor
  const player = useSelector(state => selectPlayer(state, { playerId }))
  const { name } = player
  const borderColor = get(COLOR_WHEEL, team)

  return (
    playerId && (
      <Paper
        key={playerId}
        className={classes.paper}
        variant="outlined"
        style={{ borderColor }}
        {...dragProps}
      >
        <div className={classes.cardContent}>
          <PlayerAvatar playerId={playerId} />
          <span className={classes.player}>{name}</span>
          <div className={classes.scoreArea}>
            <span className={classes.score}>{points}</span>
          </div>
        </div>
      </Paper>
    )
  )
}

const RankManualScore = ({ match }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  useTournamentPlayers()
  const { id: matchId, matchCompetitors, gameId } = match
  const game = useGame(gameId)
  const ordered = orderBy(matchCompetitors, ['position'], ['asc'])
  const [items, setItems] = useState(ordered)
  const { scores } = game
  const orderedScores = orderBy(scores, ['value'], ['desc'])

  const sendScores = (mId, mcs) =>
    dispatch(updateMatch(mId, { match_competitors_attributes: mcs }))

  const updateScores = mcs => {
    const updates = mcs.map((mc, index) => ({
      id: mc.id,
      points: get(orderedScores, [index, 'value']),
      position: index
    }))
    setItems(mcs)
    sendScores(matchId, updates).then(resp => {
      const updatedItems = get(resp, 'data.matchCompetitors')
      const orderedItems = orderBy(updatedItems, ['position'], ['asc'])
      setItems(orderedItems)
    })
  }

  useEffect(() => {
    const newItems = orderBy(matchCompetitors, ['position'], ['asc'])
    setItems(newItems)
  }, [matchCompetitors])

  return (
    <List
      values={items}
      onChange={({ oldIndex, newIndex }) => {
        const updates = arrayMove(items, oldIndex, newIndex)
        updateScores(updates)
      }}
      renderList={({ children, props }) => (
        <ul className={classes.sortList} {...props}>
          {children}
        </ul>
      )}
      renderItem={({ value, props }) => (
        <RankScoreCard
          key={value.id}
          matchCompetitor={value}
          dragProps={props}
        />
      )}
    />
  )
}

RankManualScore.propTypes = {
  match: PropTypes.shape({
    id: PropTypes.number,
    matchCompetitors: PropTypes.array,
    gameId: PropTypes.number
  })
}

RankManualScore.defaultProps = {
  match: {}
}

export default RankManualScore
