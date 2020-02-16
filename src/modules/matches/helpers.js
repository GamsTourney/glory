import find from 'lodash/find'
import maxBy from 'lodash/maxBy'
import get from 'lodash/get'
import dayjs from 'dayjs'

const getPointsByGenre = (playerId, matches, games) => {
  const breakdown = []
  const genrePoints = {}
  matches.forEach(m => {
    const { gameId, matchCompetitors } = m
    const game = find(games, { id: gameId }) || {}
    const mc = find(matchCompetitors, { playerId })
    const { genre } = game
    if (genrePoints[genre]) {
      genrePoints[genre] += mc.points
    } else {
      genrePoints[genre] = mc.points
    }
  })
  Object.keys(genrePoints).forEach(genre => {
    breakdown.push({ genre, points: genrePoints[genre] })
  })
  return breakdown
}

const getPointsOverTime = (playerId, matches) => {
  const data = []
  let points = 0
  matches.forEach(m => {
    const { endTime, matchCompetitors } = m
    const mc = find(matchCompetitors, { playerId })
    if (mc.points) {
      const time = dayjs(endTime).format('hh:mm')
      points += mc.points
      data.push({ points, time })
    }
  })
  return data
}

const getPoints = (playerId, matches) => {
  let points = 0
  matches.forEach(m => {
    const { matchCompetitors } = m
    const mc = find(matchCompetitors, { playerId })
    points += mc.points
  })
  return points
}

const getVictories = (playerId, matches) => {
  let victories = 0
  matches.forEach(m => {
    const { matchCompetitors } = m
    const points = get(maxBy(matchCompetitors, 'points'), 'points')
    const winner = find(matchCompetitors, { playerId, points })
    if (winner && points > 0) {
      victories += 1
    }
  })
  return victories
}

export { getPointsByGenre, getPointsOverTime, getPoints, getVictories }
