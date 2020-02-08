import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography
} from '@material-ui/core'
import { requestToken } from 'modules/players/actions'
import get from 'lodash/get'

const paperStyle = {
  padding: '12px'
}

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [redirect, setRedirect] = useState()
  const dispatch = useDispatch()
  const authenticate = auth =>
    dispatch(requestToken(auth)).then(() => setRedirect('/'))

  if (redirect) {
    return <Redirect to="/" />
  }

  return (
    <Container maxWidth="sm">
      <Paper elevation={2} style={paperStyle}>
        <Box m={1}>
          <Typography mt={1} variant="h4" align="center">
            Login
          </Typography>
        </Box>
        <form
          onSubmit={e => {
            e.preventDefault()
            authenticate({ email, password })
          }}
        >
          <Box m={3}>
            <TextField
              label="Email"
              value={email}
              onChange={e => setEmail(get(e, 'target.value'))}
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box m={3}>
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(get(e, 'target.value'))}
              variant="outlined"
              fullWidth
            />
          </Box>
          <Box align="right" m={3}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
            >
              Submit
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default Login
