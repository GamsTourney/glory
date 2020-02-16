import React from 'react'
import PropTypes from 'prop-types'
import flatten from 'lodash/flatten'
import get from 'lodash/get'
import find from 'lodash/find'

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip
} from 'recharts'
import dayjs from 'dayjs'
import { getPointsOverTime } from 'modules/matches/helpers'
import { COLOR_WHEEL } from 'constants/colors'

const StandingsGraph = ({ players, matches, domain }) => {
  const data = flatten(players.map(p => getPointsOverTime(p.id, matches)))

  if (data.length <= 0) {
    return null
  }

  const getPlayerName = playerId => {
    const player = find(players, { id: playerId })
    return get(player, 'name')
  }

  return (
    <ResponsiveContainer width="100%" height={375}>
      <LineChart data={data}>
        <YAxis dataKey="points" />
        <XAxis
          dataKey="time"
          type="number"
          tickFormatter={val => dayjs(val).format('hh:mm')}
          domain={domain}
        />
        <Tooltip labelFormatter={val => dayjs(val).format('hh:mm')} />
        {players.map((p, i) => (
          <Line
            key={p.id}
            name={getPlayerName(p.id)}
            type="monotone"
            dataKey={p.id}
            stroke={COLOR_WHEEL[i]}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

StandingsGraph.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({})),
  matches: PropTypes.arrayOf(PropTypes.shape({})),
  domain: PropTypes.arrayOf(PropTypes.number)
}

StandingsGraph.defaultProps = {
  players: [],
  matches: [],
  domain: []
}

export default StandingsGraph
