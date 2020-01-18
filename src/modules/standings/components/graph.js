import React from 'react'
import { useSelector } from 'react-redux'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  Rectangle
} from 'recharts'
import { useTournamentStandings } from 'modules/standings/hooks'
import { selectStandingAvatar } from 'modules/standings/selectors'
import { COLOR_WHEEL } from 'constants/colors'

const Label = props => {
  // eslint-disable-next-line
  const { id, x, y, width, height, value, index } = props
  const avatar = useSelector(state => selectStandingAvatar(state, { id }))
  const size = 25
  const xPos = x + width + 10
  const yPos = y + 2

  return (
    <g>
      <image href={avatar} x={xPos} y={yPos} height={size} width={size} />
    </g>
  )
}

const RainbowBar = props => {
  // eslint-disable-next-line
  const { index } = props
  return <Rectangle {...props} fill={COLOR_WHEEL[index]} />
}

const StandingsGraph = () => {
  const standings = useTournamentStandings()

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={standings} layout="vertical">
        <YAxis type="category" dataKey="name" />
        <XAxis type="number" />
        <Tooltip />
        <Bar shape={RainbowBar} dataKey="score">
          <LabelList dataKey="name" content={Label} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}

export default StandingsGraph
