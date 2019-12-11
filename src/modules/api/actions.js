import { request } from 'modules/api'

function fetchCollection(collection) {
  return request(collection, `/${collection}`)
}

function fetchItem(collection, itemId) {
  return request(collection, `/${collection}/${itemId}`)
}

function fetchTournamentCollection(collection, tournamentId) {
  return request(collection, `/tournaments/${tournamentId}/${collection}`)
}

function createTournamentItem(collection, tournamentId, body) {
  return request(collection, `/tournaments/${tournamentId}/${collection}`, {
    method: 'POST',
    data: body
  })
}

function updateItem(collection, itemId, body) {
  return request(collection, `/${collection}/${itemId}`, {
    method: 'PATCH',
    data: body
  })
}

function deleteItem(collection, itemId) {
  return request(collection, `/${collection}/${itemId}`, {
    method: 'DELETE'
  })
}

export {
  fetchCollection,
  fetchItem,
  fetchTournamentCollection,
  createTournamentItem,
  updateItem,
  deleteItem
}
