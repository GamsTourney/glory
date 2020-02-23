import React from 'react'
import {
  ResponsiveContainer,
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Tooltip
} from 'recharts'
import { indigo } from '@material-ui/core/colors'

import { getPointsByGenre } from 'modules/matches/helpers'

// eslint-disable-next-line
const GenreBreakdown = ({ playerId, matches, games }) => {
  const breakdown = getPointsByGenre(playerId, matches, games)

  if (breakdown.length <= 0) {
    return null
  }

  return (
    <ResponsiveContainer height={250} width="100%">
      <RadarChart outerRadius={100} data={breakdown}>
        <PolarGrid />
        <PolarAngleAxis dataKey="genre" />
        <Radar
          name="score"
          dataKey="points"
          stroke={indigo['500']}
          fill={indigo['500']}
          fillOpacity={0.6}
        />
        <Tooltip />
      </RadarChart>
    </ResponsiveContainer>
  )
}

export default GenreBreakdown
