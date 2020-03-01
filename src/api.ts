import { Promise } from 'bluebird'
import axios, { AxiosResponse } from 'axios'
import config from './config'
import { IGeographyLookup, IBoundaryGeography, IOffence } from './types/crime'
import { LocationType, CrimeType } from './enums'
import { mapLocationTypeToValidApiParam } from './utils'
import { format, parseISO } from 'date-fns'

const server = axios.create({
  baseURL: config.serverUri
})

server.interceptors.request.use(onAxiosBegin, undefined)
server.interceptors.response.use(onSuccess, onAxiosError)

function onAxiosBegin(config: any) {
  return config
}

function onAxiosError(err: any) {
  if (!err.response) {
    return Promise.reject(err)
  } else {
    return Promise.reject(err)
  }
}

function onSuccess(res: AxiosResponse<any>): any {
  localStorage.setItem(res.config.url!, JSON.stringify(res.data))
  return res.data
}

export function getGeographies(): Promise<IGeographyLookup[]> {
  const local = localStorage.getItem(`${server.defaults.baseURL}/dev/lut`)
  if (local) return Promise.resolve(JSON.parse(local))
  else return server.get('/dev/lut')
}

export function getBoundaries(locationType: LocationType, locationName: string): Promise<IBoundaryGeography[]> {
  const mappedLocation = mapLocationTypeToValidApiParam(locationType)
  const local = localStorage.getItem(
    `${server.defaults.baseURL}/dev/locations?locationType=${mappedLocation}&locationName=${encodeURIComponent(locationName)}`
  )
  if (local) return Promise.resolve(JSON.parse(local))
  else return server.get(`/dev/locations?locationType=${mappedLocation}&locationName=${encodeURIComponent(locationName)}`)
}

export function getOffences(type: CrimeType, locationName: string, startDate: string, endDate: string): Promise<IOffence[]> {
  const start = format(parseISO(startDate), 'MM-dd-yyyy')
  const end = format(parseISO(endDate), 'MM-dd-yyyy')
  const local = localStorage.getItem(
    `${server.defaults.baseURL}/dev/offences?locationType=${type}&startDate=${startDate}&locationName=${locationName}&endDate=${endDate}&format=JSON`
  )
  if (local) return Promise.resolve(JSON.parse(local))
  return server.get(`/dev/offences?locationType=${type}&startDate=${start}&locationName=${locationName}&endDate=${end}&format=JSON`)
}
