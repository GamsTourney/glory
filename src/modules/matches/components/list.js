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

const ZeroState = () => <div style={{ textAlign: 'center' }}>All done!</div>

const MatchList = ({ matches }) => {
  const classes = useStyles()
  return (
    <div className={classes.upcoming}>
      {matches.length > 0 ? (
        matches.map(m => <MatchCard match={m} key={m.id} />)
      ) : (
        <ZeroState />
      )}
    </div>
  )
}

MatchList.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.shape({ id: PropTypes.number }))
    .isRequired
}

export default MatchList
