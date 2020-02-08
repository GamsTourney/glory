import React from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Route, Redirect } from 'react-router-dom'

import { selectIsAuthenticated } from 'modules/players/selectors'

const AppRoute = ({ component: Component, open, location, ...rest }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated)

  return (
    <Route
      {...rest}
      render={props =>
        open || isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  )
}

AppRoute.propTypes = {
  open: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  location: PropTypes.string
}

AppRoute.defaultProps = {
  open: false,
  location: '/'
}

export default AppRoute
