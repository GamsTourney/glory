import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import get from 'lodash/get'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(1),
    marginBottom: theme.spacing(1)
  }
}))

const MatchCard = ({ match }) => {
  const { gameId } = match
  const classes = useStyles()
  return (
    <Paper className={classes.paper} variant="outlined">
      <div>{gameId}</div>
    </Paper>
  )
}

MatchCard.propTypes = {
  match: PropTypes.shape({
    game: PropTypes.shape({
      name: PropTypes.string
    })
  }).isRequired
}

export default MatchCard
