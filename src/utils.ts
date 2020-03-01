import { GeographicType, LocationType } from './enums'

export function mapGeographicToLocationType(type: GeographicType) {
  switch (type) {
    case GeographicType['QPS District']:
      return LocationType['QPS District']
    case GeographicType['Local Government Area']:
      return LocationType['Local Government Area']
    case GeographicType['Neighbourhood Watch']:
      return LocationType['Neighbourhood Watch']
    case GeographicType['QPS Division']:
      return LocationType['QPS Division']
    case GeographicType.Suburb:
      return LocationType.SUBURB
    case GeographicType['QPS Patrol Group']:
      return LocationType['QPS Patrol Group']
    case GeographicType['QPS Region']:
      return LocationType['QPS Region']

    case GeographicType.POSTCODE:
      console.error('unsupported mapping: ' + type)
      return
  }
}

export function mapLocationTypeToValidApiParam(type: LocationType) {
  switch (type) {
    case LocationType['Local Government Area']:
      return 'LGA'
    case LocationType['Neighbourhood Watch']:
      return 'NHW'
    case LocationType['QPS District']:
      return 'DISTRICT'
    case LocationType['QPS Division']:
      return 'DIVISION'
    case LocationType['QPS Patrol Group']:
      return 'PATROLGROUP'
    case LocationType['QPS Region']:
      return 'REGION'
    case LocationType.SUBURB:
      return 'SUBURB'
    default:
      throw new Error('unsupported LocationType:' + type)
  }
}

export function getPolygonCentroid(latlngs: [number, number][]) {
  const first = latlngs[0]
  const last = latlngs[latlngs.length - 1]

  // close the polygon
  if (first[0] !== last[0] || first[1] !== last[1]) {
    latlngs.push(first)
  }

  let twicearea = 0,
    x = 0,
    y = 0,
    nPts = latlngs.length,
    p1,
    p2,
    f

  for (let i = 0, j = nPts - 1; i < nPts; j = i++) {
    p1 = latlngs[i]
    p2 = latlngs[j]
    f = p1[0] * p2[1] - p2[0] * p1[1]
    twicearea += f
    x += (p1[0] + p2[0]) * f
    y += (p1[1] + p2[1]) * f
  }

  f = twicearea * 3
  return { lat: x / f, lng: y / f }
}

export function flatten(arr: any[]): any {
  return arr.reduce(function(flat, toFlatten) {
    return flat.concat(Array.isArray(toFlatten) ? flatten(toFlatten) : toFlatten)
  }, [])
}

export function getRandomHexColor() {
  const letters = '0123456789ABCDEF'
  return '#' + Array.from(Array(6), _ => letters[Math.floor(Math.random() * 16)]).reduce((p, i) => p + i, '')
}
