import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Button, Input } from '@material-ui/core'
import get from 'lodash/get'

import { useMatch } from 'modules/matches/hooks'
import { uploadPicture } from 'modules/matches/actions'
import { getAttachmentUrl } from 'utils/attachments'

const MatchDetail = ({ match: location }) => {
  const dispatch = useDispatch()
  const [resultPicture, setResultPicture] = useState()
  const matchId = get(location, 'params.matchId')
  const match = useMatch(matchId)
  const imgUrl = get(match, 'resultPicture')

  const attach = e => {
    e.preventDefault()
    dispatch(uploadPicture(matchId, resultPicture))
  }

  return (
    <div>
      <form onSubmit={attach}>
        <Input
          type="file"
          inputProps={{ accept: 'image/*', capture: 'camera' }}
          onChange={e => {
            const file = get(e, 'target.files.0')
            setResultPicture(file)
          }}
        />
        <Button type="submit">Submit</Button>
      </form>
      {imgUrl && (
        <img alt="attachment" src={getAttachmentUrl(imgUrl)} width="150" />
      )}
    </div>
  )
}

export default withRouter(MatchDetail)
