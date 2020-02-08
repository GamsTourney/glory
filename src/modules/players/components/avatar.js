import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { useSelector } from 'react-redux'
import get from 'lodash/get'

import { selectPlayer } from 'modules/players/selectors'

const avatar = {
  borderRadius: '50%',
  marginRight: '8px'
}

const useStyles = makeStyles(() => ({
  avatar,
  winner: {
    ...avatar
  }
}))

const PlayerAvatar = ({ playerId, isWinner, size }) => {
  const classes = useStyles()
  const player = useSelector(state => selectPlayer(state, { playerId }))

  if (!playerId) {
    return null
  }

  const key = size ? `steam.avatar${size}` : 'steam.avatar'
  const url = get(player, key)
  const cn = isWinner ? classes.winner : classes.avatar
  return <img alt="player" className={cn} src={url} />
}

PlayerAvatar.propTypes = {
  playerId: PropTypes.number,
  isWinner: PropTypes.bool,
  size: PropTypes.oneOf([null, 'medium', 'full'])
}

PlayerAvatar.defaultProps = {
  playerId: undefined,
  isWinner: false,
  size: null
}

export default PlayerAvatar
