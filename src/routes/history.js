import { createBrowserHistory as createHistory } from 'history'

const history = createHistory()

export function getHistory() {
  return history
}
