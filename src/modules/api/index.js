import runtimeEnv from '@mars/heroku-js-runtime-env'
import axios from 'axios'
import get from 'lodash/get'

import { getHistory } from 'routes/history'

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

  return Promise.resolve(data)
}

function request(collection, url, options = {}) {
  const method = get(options, 'method', 'GET')
  const req = {
    method,
    url,
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
  }
}

export {
  API_URL,
  API_FETCH,
  API_RECEIVE,
  request
}
