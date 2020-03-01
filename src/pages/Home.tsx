import React, { useEffect, useState } from 'react'
import { Map, TileLayer, Polygon } from 'react-leaflet'
import { brisbaneCoords } from '../constants'
import { getGeographies, getBoundaries, getOffences } from '../api'
import { IGeographyLookup, IBoundaryGeography, IGeoJsonItem, IOffence } from '../types/crime'
import { LocationType, CrimeType } from '../enums'
import { getPolygonCentroid, mapGeographicToLocationType } from '../utils'
import VisualizeOffences from '../components/VisualizeOffences'
import { sub, format } from 'date-fns'
interface IHomeProps {}

const now = new Date()
const startDateMin = format(sub(now, { years: 5 }), 'yyyy-MM-dd')
const startDateMax = format(sub(now, { days: 1 }), 'yyyy-MM-dd')
const endDateMax = format(now, 'yyyy-MM-dd')
const defaults = {
  startDate: format(sub(now, { months: 1 }), 'yyyy-MM-dd'),
  endDate: format(now, 'yyyy-MM-dd')
}

const Home = (props: IHomeProps) => {
  const [mapLatLng, setMapLatLng] = useState(brisbaneCoords)
  const [locationType, setLocationType] = useState<LocationType>(LocationType.SUBURB)
  const [locationSearch, setSuburbSearch] = useState('Toowong')
  const [geographies, setGeographies] = useState<IGeographyLookup[]>()

  const [, setBoundaries] = useState<IBoundaryGeography[]>()
  const [boundaryFeatures, setBoundaryFeatures] = useState<IGeoJsonItem[]>()

  const [startDateISO, setStartDate] = useState(defaults.startDate)
  const [endDateISO, setEndDate] = useState(defaults.endDate)

  //const [userLocation, setUserLocation] = useState([])

  const [offences, setOffences] = useState<IOffence[]>([])

  useEffect(() => {
    getGeographies().then(res => {
      setGeographies(res)
    })
    //navigator.geolocation.getCurrentPosition(console.log, console.error, { enableHighAccuracy: true })
  }, [])

  useEffect(() => {
    if (!locationSearch) {
      setBoundaryFeatures([])
      setBoundaries([])
      return
    }
    if (geographies && !geographies.find(x => mapGeographicToLocationType(x.type) === locationType && x.name === locationSearch)) {
      setBoundaryFeatures([])
      setBoundaries([])
      return
    }

    getBoundaries(locationType, locationSearch).then(res => {
      setBoundaries(res)
      const allFeatures = res.reduce<IGeoJsonItem[]>((p, c) => [...p, ...c.features], [])
      setBoundaryFeatures(allFeatures)
      // @ts-ignore
      const centroid = getPolygonCentroid(res[0].features[0].geometry.coordinates[0].map<[number, number]>(coords => [coords[1], coords[0]]))
      setMapLatLng([centroid.lat, centroid.lng])
    })
  }, [locationSearch, geographies, locationType])

  useEffect(() => {
    if (!locationSearch || !startDateISO || !endDateISO) {
      return
    }
    if (geographies && !geographies.find(x => mapGeographicToLocationType(x.type) === locationType && x.name === locationSearch)) {
      return
    }
    getOffences(CrimeType.SUBURB, locationSearch, startDateISO, endDateISO).then(res => {
      setOffences(res)
    })
  }, [locationSearch, startDateISO, endDateISO, geographies, locationType])

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-5">
          <form>
            <div className="form-row">
              <div className="col-12">
                <label>
                  <strong>Location</strong>
                </label>
              </div>
              <div className="col">
                <input type="text" className="form-control" value={locationSearch} onChange={e => setSuburbSearch(e.target.value)} />
              </div>
              <div className="col">
                <select
                  className="form-control"
                  value={locationType}
                  onChange={e => setLocationType(LocationType[e.target.value as keyof typeof LocationType])}
                >
                  <option value="">Select ...</option>
                  {Object.values(LocationType).map(x => (
                    <option key={x} value={x}>
                      {x}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="col-12">
                <label>
                  <strong>Dates</strong>
                </label>
              </div>
              <div className="col">
                <input
                  type="date"
                  className="form-control"
                  value={startDateISO}
                  onChange={e => setStartDate(e.target.value)}
                  min={startDateMin}
                  max={startDateMax}
                />
              </div>
              <div className="col">
                <input type="date" className="form-control" value={endDateISO} onChange={e => setEndDate(e.target.value)} max={endDateMax} />
              </div>
            </div>
          </form>

          <VisualizeOffences offences={offences} />
        </div>
        <div className="col-7">
          <Map center={mapLatLng} zoom={13} style={{ height: '800px', width: '100%' }}>
            <TileLayer
              attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
              url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
            />
            {boundaryFeatures &&
              boundaryFeatures.map(f => {
                return (
                  <Polygon
                    key={f.properties.Name}
                    color="#660000"
                    // @ts-ignore
                    positions={f.geometry.coordinates[0].map<[number, number]>(coords => [coords[1], coords[0]])}
                  />
                )
              })}
            {/* <Marker position={brisbaneCoords}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </Marker> */}
          </Map>
        </div>
      </div>
    </div>
  )
}

export default Home
