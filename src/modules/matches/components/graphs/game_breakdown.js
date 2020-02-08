import React from 'react'
import {
  Cell,
  ResponsiveContainer,
  LabelList,
  PieChart,
  Pie,
  Tooltip
} from 'recharts'
import groupBy from 'lodash/groupBy'
import sumBy from 'lodash/sumBy'
import get from 'lodash/get'

import { COLOR_WHEEL } from 'constants/colors'

function getInitials(name) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
}

/* eslint-disable */
const GameBreakdown = ({ matches, games }) => {
  const matchesByGame = groupBy(matches, 'gameId')
  const availablePoints = []
  const claimedPoints = []
  Object.entries(matchesByGame).forEach(([gameId, matches]) => {
    const game = find(games, { id: gameId }) || {}
    const name = get(game, 'name', '')
    const initials = getInitials(name)
    const maxPoints = get(game, 'maxScore')
    availablePoints.push({ name, value: maxPoints * matches.length, initials })
  })

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <text
          x="50%"
          y={125}
          textAnchor="middle"
          dominantBaseline="middle"
          style={{ fontSize: '2.5em' }}
        >
          {sumBy(availablePoints, 'value')}
        </text>
        <Pie
          data={availablePoints}
          innerRadius={75}
          outerRadius={100}
          paddingAngle={5}
          dataKey="value"
        >
          <LabelList
            dataKey="initials"
            position="outside"
            stroke="black"
            stokeWidth="1px"
            fontSize="1.2em"
            fill="black"
          />
          {availablePoints.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLOR_WHEEL[index % COLOR_WHEEL.length]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  )
}

export default GameBreakdown
