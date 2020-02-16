import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import { teal } from '@material-ui/core/colors'

import { getPointsOverTime } from 'modules/matches/helpers'

// eslint-disable-next-line
const PointsOverTime = ({ playerId, matches }) => {
  const data = getPointsOverTime(playerId, matches)

  return (
    <ResponsiveContainer height={250} width="100%">
      <LineChart data={data}>
        <XAxis dataKey="label" />
        <YAxis />
        <Tooltip />
        <Line dot type="monotone" dataKey="points" stroke={teal['500']} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default PointsOverTime
