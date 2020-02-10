import React from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Button } from '@material-ui/core'
import { CameraAlt } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import get from 'lodash/get'

import { uploadPicture } from 'modules/matches/actions'

const useStyles = makeStyles(() => ({
  uploadIcon: {
    marginRight: '8px'
  },
  uploadButton: {
    display: 'flex',
    alignItems: 'center'
  }
}))

const ResultUploadPicture = ({ matchId }) => {
  const dispatch = useDispatch()
  const classes = useStyles()

  const attach = file => {
    dispatch(uploadPicture(matchId, file))
  }

  const inputClick = () => document.getElementById('result-upload').click()

  return (
    <label htmlFor="result-upload" className="result-file-upload">
      <Button
        variant="contained"
        color="primary"
        className={classes.uploadButton}
        onClick={inputClick}
      >
        <CameraAlt className={classes.uploadIcon} />
        Results
      </Button>

      <input
        id="result-upload"
        type="file"
        accept="image/*"
        capture="camera"
        style={{ display: 'none' }}
        onChange={e => {
          const file = get(e, 'target.files.0')
          attach(file)
        }}
      />
    </label>
  )
}

ResultUploadPicture.propTypes = {
  matchId: PropTypes.string.isRequired
}

export default ResultUploadPicture
