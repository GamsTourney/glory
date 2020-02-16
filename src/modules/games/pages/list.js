import React from 'react'
import { Link } from 'react-router-dom'
import { Grid } from '@material-ui/core'

import { useTournamentGames } from 'modules/games/hooks'

const GameList = () => {
  const games = useTournamentGames()

  return (
    <Grid container spacing={2}>
      {games.map(g => {
        const { imgUrl } = g
        return (
          <Grid item xs={12} md={6}>
            <Link to={`/games/${g.id}`} style={{ width: '100%' }}>
              {imgUrl && <img alt="gamePicture" src={imgUrl} width="100%" />}
            </Link>
          </Grid>
        )
      })}
    </Grid>
  )
}

export default GameList
