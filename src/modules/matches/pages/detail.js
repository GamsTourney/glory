import React from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import { Assignment } from '@material-ui/icons'
import get from 'lodash/get'

import { useMatch } from 'modules/matches/hooks'
import { getAttachmentUrl } from 'utils/attachments'
import { useCurrentPlayer } from 'modules/players/hooks'
import ReportButton from 'modules/matches/components/upload'

const useStyles = makeStyles(() => ({
  button: {
    marginRight: '12px',
    display: 'flex',
    alignItems: 'center'
  },
  buttonIcon: {
    marginRight: '8px'
  },
  buttonToolbar: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  link: {
    textDecoration: 'none'
  }
}))

const MatchDetail = ({ match: location }) => {
  const classes = useStyles()
  const currentPlayer = useCurrentPlayer()
  const { admin } = currentPlayer
  const matchId = get(location, 'params.matchId')
  const match = useMatch(matchId)
  const imgUrl = get(match, 'resultPicture')

  return (
    <div>
      {admin && (
        <div className={classes.buttonToolbar}>
          <Link to={`/matches/${matchId}/score`} className={classes.link}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              <Assignment className={classes.buttonIcon} />
              Score
            </Button>
          </Link>
          <ReportButton matchId={matchId} />
        </div>
      )}
      {imgUrl && (
        <img alt="attachment" src={getAttachmentUrl(imgUrl)} width="150" />
      )}
    </div>
  )
}

MatchDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      matchId: PropTypes.string
    })
  }).isRequired
}

export default withRouter(MatchDetail)
