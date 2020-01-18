import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import MatchCard from './card'

const useStyles = makeStyles(() => ({
  upcoming: {
    height: '375px',
    overflow: 'scroll'
  }
}))

const MatchList = ({ matches }) => {
  const classes = useStyles()
  return (
    <div className={classes.upcoming}>
      {matches.map(m => (
        <MatchCard match={m} key={m.id} />
      ))}
    </div>
  )
}

MatchList.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number }))
    .isRequired
}

export default MatchList
