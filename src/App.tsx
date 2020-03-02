import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'

import NotFound from './pages/NotFound'
import Home from './pages/Home'
import About from './pages/About'
import Navbar from './components/Navbar'
import L from 'leaflet'
// BUG https://github.com/Leaflet/Leaflet/issues/4968
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'
L.Marker.prototype.options.icon = L.icon({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
})

const App = () => {
  return (
    <Router basename="qld">
      <div id="application">
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />

          <Route component={NotFound} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
