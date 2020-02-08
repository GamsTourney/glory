import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'
import {
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import {
  Dashboard,
  Event,
  Games,
  People,
  SportsEsports as Controller,
  Timeline
} from '@material-ui/icons'
import { useActiveTournament } from 'modules/tournaments/hooks'
import get from 'lodash/get'

const useStyles = makeStyles({
  divider: {
    margin: '8px 0px 12px 0px'
  },
  list: {
    width: 300
  },
  link: {
    textDecoration: 'none',
    color: 'black'
  },
  tournamentName: {
    display: 'flex',
    alignItems: 'center',
    margin: '16px'
  }
})

const DrawerLink = ({ link, name, Icon }) => {
  const classes = useStyles()
  return (
    <Link to={link} className={classes.link}>
      <ListItem button key={name}>
        <ListItemIcon>
          <Icon />
        </ListItemIcon>
        <ListItemText primary={name} />
      </ListItem>
    </Link>
  )
}

DrawerLink.propTypes = {
  link: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  Icon: PropTypes.shape({}).isRequired
}

const AppDrawer = ({ open, handleClose }) => {
  const tournament = useActiveTournament()
  const classes = useStyles()

  return (
    <div>
      <Drawer open={open} onClose={handleClose}>
        <div
          className={classes.list}
          role="presentation"
          onClick={handleClose}
          onKeyDown={handleClose}
        >
          <List>
            <ListItem key="Tournament">
              <ListItemIcon>
                <Controller />
              </ListItemIcon>
              <ListItemText primary={get(tournament, 'name')} />
            </ListItem>
            <Divider className={classes.divider} />
            <DrawerLink link="/" name="Overview" Icon={Dashboard} />
            <DrawerLink link="/schedule" name="Schedule" Icon={Event} />
            <DrawerLink link="/games" name="Games" Icon={Games} />
            <DrawerLink link="/players" name="Players" Icon={People} />
            <DrawerLink link="/reports" name="Reports" Icon={Timeline} />
          </List>
        </div>
      </Drawer>
    </div>
  )
}

AppDrawer.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func.isRequired
}

AppDrawer.defaultProps = {
  open: false
}

export default AppDrawer
