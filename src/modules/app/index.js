import React from 'react'
import PropTypes from 'prop-types'
import { Container, ThemeProvider } from '@material-ui/core'
import { createMuiTheme } from '@material-ui/core/styles'
import { green, teal } from '@material-ui/core/colors'
import { Provider } from 'react-redux'
import { Router } from 'react-router'

import appRoutes from 'routes'
import { getHistory } from 'routes/history'
import AppRoute from './app_route'
import Bar from './bar'
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
    primary: teal,
    success: green
  }
})

const Layout = ({ routes }) => {
  return (
    <>
      <Bar />
      <Container id="main-container">
        {routes.map(r => (
          <AppRoute
            key={r.path}
            path={r.path}
            component={r.content}
            exact={r.exact}
            open={r.open}
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
