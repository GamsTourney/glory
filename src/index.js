import React from 'react'
import { render } from 'react-dom'
import App from 'modules/app'
import getStore from 'store/configure'

render(<App store={getStore()} />, document.getElementById('root'))
