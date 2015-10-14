// fix browser land
import 'babel-core/polyfill'
import 'normalize.css'
// third party imports imports
import React from 'react'
import ReactDOM from 'react-dom'
// local imports
import Root from 'components/Root'


// render the application
ReactDOM.render(<Root />, document.getElementById('app'))
