import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core'
import {
  Menu as MenuIcon,
  ExitToApp as Logout,
  Person
} from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import AccountCircle from '@material-ui/icons/AccountCircle'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import get from 'lodash/get'

import { selectIsAuthenticated } from 'modules/players/selectors'
import { logout } from 'modules/players/actions'
import { useCurrentPlayer } from 'modules/players/hooks'
import { useTournaments, useActiveTournament } from 'modules/tournaments/hooks'
import AppDrawer from './drawer'

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  user: {
    display: 'flex',
    alignItems: 'center'
  },
  userButton: {
    marginLeft: theme.spacing(2)
  },
  menuItemIcon: {
    marginRight: '8px'
  }
}))

const Bar = () => {
  useTournaments()
  const tournament = useActiveTournament()
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const dispatch = useDispatch()
  const classes = useStyles()
  const currentPlayer = useCurrentPlayer()
  const [anchorEl, setAnchorEl] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false)
  const open = !!anchorEl

  const handleMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const closeDrawer = () => setDrawerOpen(false)
  const handleLogout = () => dispatch(logout())

  return (
    <AppBar position="static" color="primary">
      <AppDrawer open={drawerOpen} handleClose={closeDrawer} />
      <Toolbar>
        <IconButton
          className={classes.menuButton}
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => setDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6">
          {get(tournament, 'name')}
        </Typography>
        {isAuthenticated && currentPlayer && (
          <div className={classes.user}>
            <Typography variant="h6">{currentPlayer.name}</Typography>
            <IconButton
              aria-label="account of user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
              className={classes.userButton}
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Person className={classes.menuItemIcon} />
                <span>Profile</span>
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <Logout className={classes.menuItemIcon} />
                <span>Logout</span>
              </MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Bar
