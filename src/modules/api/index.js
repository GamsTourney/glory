import runtimeEnv from '@mars/heroku-js-runtime-env'
import axios from 'axios'
import get from 'lodash/get'

import { getHistory } from 'routes/history'
import { API_AUTHORIZED, API_UNAUTHORIZED } from 'modules/players/dux'
import { getCurrentPlayerId } from 'modules/players/helpers'

const env = runtimeEnv()

const API_URL = env.REACT_APP_API_URL
const API_FETCH = 'API_FETCH'
const API_RECEIVE = 'API_RECEIVE'

const requester = axios.create({
  baseURL: API_URL
})
requester.defaults.headers.common.Accept = 'application/json'

function apiRecieve(collection, method, json) {
  return { type: API_RECEIVE, entity: collection, method, [collection]: json }
}

function processResponse(dispatch, state, data) {
  if (data.jwt) {
    localStorage.setItem('token', data.jwt)
  }

  if (data.redirect) {
    const history = getHistory()
    history.push(data.redirect)
    return true
  }

  if (!get(state, 'login.currentPlayerId')) {
    return Promise.resolve(
      dispatch({
        type: API_AUTHORIZED,
        currentPlayerId: getCurrentPlayerId(data.jwt)
      })
    ).then(() => data)
  }

  return Promise.resolve(data)
}

function request(collection, url, options = {}) {
  const method = get(options, 'method', 'GET')
  const req = {
    method,
    url,
    headers: {
      authorization: `Bearer ${localStorage.getItem('token')}`
    },
    ...options
  }

  return (dispatch, getState) => {
    let resp
    const state = getState()
    return requester(req)
      .then(response => {
        resp = response
        const { data } = response
        return processResponse(dispatch, state, data)
      })
      .then(data => dispatch(apiRecieve(collection, method, data)))
      .then(() => resp)
      .catch(error => {
        const errorResponse = error.response
        if (errorResponse && errorResponse.status === 401) {
          return dispatch({ type: API_UNAUTHORIZED })
        }
        return errorResponse
      })
  }
}

export { API_URL, API_FETCH, API_RECEIVE, apiRecieve, request }
