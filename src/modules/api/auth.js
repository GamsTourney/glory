import React from 'react'
import PropTypes from 'prop-types'
import { withRouter, Redirect } from 'react-router-dom'
import get from 'lodash/get'

const AuthRedirect = ({ match }) => {
  const token = get(match, 'params.token')
  localStorage.setItem('token', token)
  return <Redirect to="/" />
}

AuthRedirect.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({ code: PropTypes.string })
  }).isRequired
}

export default withRouter(AuthRedirect)
