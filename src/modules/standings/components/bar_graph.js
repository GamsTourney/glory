import React from 'react'
import PropTypes from 'prop-types'
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
import { selectTournamentStandings } from 'modules/standings/selectors'
import { selectPlayer } from 'modules/players/selectors'
import { COLOR_WHEEL } from 'constants/colors'
import get from 'lodash/get'

const Label = props => {
  // eslint-disable-next-line
  const { id: playerId, x, y, width, height, value, index } = props
  const player = useSelector(state => selectPlayer(state, { playerId }))
  const avatar = get(player, 'steam.avatar')
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

const StandingsGraph = ({ matches }) => {
  const standings = useSelector(state =>
    selectTournamentStandings(state, { matches })
  )

  if (standings.length <= 0) {
    return null
  }

  return (
    <ResponsiveContainer width="100%" height={375}>
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

StandingsGraph.propTypes = {
  matches: PropTypes.arrayOf(PropTypes.shape({}))
}

StandingsGraph.defaultProps = {
  matches: []
}

export default StandingsGraph
