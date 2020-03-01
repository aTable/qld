import { LocationType, OffenceType, GeographicType } from '../enums'

export interface IGeographyLookup {
  name: string
  type: GeographicType
}

export interface IGeoJsonItem {
  type: 'Feature'
  geometry: {
    type: 'Polygon'
    coordinates: [[number, number]]
  }
  properties: {
    Name: string
    Type: LocationType
  }
}

export interface IBoundaryGeography {
  type: 'FeatureCollection'
  features: IGeoJsonItem[]
}

export interface IOffence {
  'Area of Interest': string
  Date: string
  Postcode: number
  Type: OffenceType
}
