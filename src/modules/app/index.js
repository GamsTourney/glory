import React from 'react'
import PropTypes from 'prop-types'
import {
  AppBar,
  Container,
  IconButton,
  Toolbar,
  ThemeProvider,
  Typography
} from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import { createMuiTheme } from '@material-ui/core/styles'
import teal from '@material-ui/core/colors/teal'
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'

import appRoutes from 'routes'
import { getHistory } from 'routes/history'
import './styles.scss'

const stylesheets = [
  'https://fonts.googleapis.com/css?family=Nunito:400,700&display=swap',
  'https://fonts.googleapis.com/icon?family=Material+Icons'
]

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Nunito'
  },
  palette: {
    primary: teal
  }
})

const Layout = ({ routes }) => {
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">Gams</Typography>
        </Toolbar>
      </AppBar>
      <Container id="main-container">
        {routes.map(r => (
          <Route
            key={r.path}
            path={r.path}
            component={r.content}
            exact={r.exact}
          />
        ))}
      </Container>
    </>
  )
}

Layout.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      path: PropTypes.string,
      content: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
      exact: PropTypes.bool,
      open: PropTypes.bool
    })
  ).isRequired
}

// eslint-disable-next-line
const App = ({ store }) => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router history={getHistory()}>
          {stylesheets.map(s => (
            <link key={s} rel="stylesheet" href={s} />
          ))}
          <Layout routes={appRoutes} />
        </Router>
      </ThemeProvider>
    </Provider>
  )
}

export default App
