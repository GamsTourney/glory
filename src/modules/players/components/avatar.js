import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Badge } from '@material-ui/core'
import { useSelector } from 'react-redux'
import get from 'lodash/get'

import { selectPlayer } from 'modules/players/selectors'

const avatar = {
  borderRadius: '50%',
  marginRight: '8px'
}

const useStyles = makeStyles(theme => {
  return {
    avatar,
    winner: {
      border: `3px solid ${theme.palette.success.main}`,
      ...avatar
    }
  }
})

const PlayerAvatar = ({ playerId, isWinner, points, size, isLink }) => {
  const classes = useStyles()
  const player = useSelector(state => selectPlayer(state, { playerId }))
  const key = size ? `steam.avatar${size}` : 'steam.avatar'
  const url = get(player, key)

  if (!playerId || !url) {
    return null
  }

  const cn = isWinner ? classes.winner : classes.avatar
  let content = (
    <Badge
      color="primary"
      overlap="circle"
      badgeContent={points}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
    >
      <img alt="player" className={cn} src={url} />
    </Badge>
  )

  if (isLink) {
    content = <Link to={`/players/${playerId}`}>{content}</Link>
  }

  return content
}

PlayerAvatar.propTypes = {
  playerId: PropTypes.number,
  isWinner: PropTypes.bool,
  points: PropTypes.number,
  size: PropTypes.oneOf([null, 'medium', 'full']),
  isLink: PropTypes.bool
}

PlayerAvatar.defaultProps = {
  playerId: undefined,
  isWinner: false,
  points: undefined,
  size: null,
  isLink: false
}

export default PlayerAvatar
