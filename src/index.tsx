import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import * as serviceWorker from './serviceWorker'

// import config from './config'
import $ from 'jquery'
import Popper from 'popper.js'
import '@fortawesome/fontawesome-free/css/fontawesome.css'
import '@fortawesome/fontawesome-free/css/regular.css'
import '@fortawesome/fontawesome-free/css/solid.css'
import 'leaflet/dist/leaflet.css'
import 'bootstrap/dist/css/bootstrap.css'
import './css/base.scss'

/*
----------------------------------------------------------------------
  Shim to provide dependent plugins without ejecting create-react-app
*/
// @ts-ignore
window.jQuery = $
// @ts-ignore
window.$ = $
// @ts-ignore
window.Popper = Popper
require('bootstrap')
/* ------------------------------------------------------------------- */

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
