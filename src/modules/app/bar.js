import React from 'react'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import { Menu } from '@material-ui/icons'

import { useCurrentPlayer } from 'modules/players/hooks'
import { useTournaments } from 'modules/tournaments/hooks'

const Bar = () => {
  useCurrentPlayer()
  useTournaments()

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <Typography variant="h6">Gams</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default Bar
