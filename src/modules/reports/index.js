import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grid, Slider } from '@material-ui/core'
import dayjs from 'dayjs'
import minBy from 'lodash/minBy'
import maxBy from 'lodash/maxBy'
import filter from 'lodash/filter'
import get from 'lodash/get'

import { useTournamentPlayers } from 'modules/players/hooks'
import { useTournamentMatches } from 'modules/matches/hooks'
import StandingsBarGraph from 'modules/standings/components/bar_graph'
import StandingsLineGraph from 'modules/standings/components/line_graph'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2)
  },
  slider: {
    padding: theme.spacing(2)
  }
}))

const Reports = () => {
  const classes = useStyles()
  const players = useTournamentPlayers()
  const matches = useTournamentMatches()
  const [value, setValue] = useState(0)
  const onSlide = (_, newValue) => {
    setValue(newValue)
  }
  const start = get(minBy(matches, 'endTime'), 'endTime')
  const end = get(maxBy(matches, 'endTime'), 'endTime')

  const startTime = dayjs(start).valueOf()
  const endTime = dayjs(end).valueOf()

  useEffect(() => {
    if (start) {
      const newStart = dayjs(start).valueOf()
      setValue(newStart)
    }
  }, [start])

  const visibleMatches = filter(matches, m =>
    dayjs(m.endTime).isBefore(dayjs(value + 1))
  )

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <div className={classes.slider}>
          <Slider
            value={value}
            onChange={onSlide}
            min={startTime}
            max={endTime}
            valueLabelDisplay="auto"
            valueLabelFormat={() => dayjs(value).format('hh:mm')}
          />
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <StandingsBarGraph matches={visibleMatches} />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper className={classes.paper}>
          <StandingsLineGraph
            players={players}
            matches={visibleMatches}
            domain={[startTime, dayjs(value + 1).valueOf()]}
          />
        </Paper>
      </Grid>
    </Grid>
  )
}

export default Reports
