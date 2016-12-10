import axios from 'axios';

import _ from 'lodash';
import config from './config';
import Boundary from './models/Boundary';
import Crime from './models/Crime';

/*
    retrieves boundaries filtering for name
*/
export function getBoundariesByName(boundaryName) {
    const url = `${config.apiUrl}/boundary?name=${boundaryName}`;
    if (isRequestStored(url)) {
        const boundaries = reduceBoundaries(JSON.parse(window.localStorage.getItem(url)));
        return Promise.resolve(boundaries);
    }

    return axios.get(url, {
        params: {
            returngeometry: config.isGeometricalDataRequest,
            maxresults: config.maxResults,
        }
    }).then(res => {
        window.localStorage.setItem(url, JSON.stringify(res.data.Result));
        return reduceBoundaries(res.data.Result);
    });

}

/*
    retrieves boundaries filtering for a location (lat, lng)
*/
export function getBoundariesByLocation(lat, lng) {
    console.error('incomplete method - cryptic response needs to be deciphered from the payload')
    const url = `${config.apiUrl}/boundary?latitude=${lat}&longitude=${lng}`;
    if (isRequestStored(url)) {
        const boundaries = reduceBoundaries(JSON.parse(window.localStorage.getItem(url)));
        return Promise.resolve(boundaries);
    }

    return axios.get(url, {
        params: {
            maxresults: config.maxResults,
        },
    }).then(res => {
        window.localStorage.setItem(url, JSON.stringify(res.data.Result))
        // TODO: payload states Multiple Localities - See Index" 
        // figure out this cryptic message
        // hint: check HowToUseTheCrimeMapAPI.docx
        throw new Error('unsupported');
    })
}

/*
    retrieves crime records
*/
export function getCrime(boundaryIdList, offenceIdList, startUnix, endUnix) {
    const url = `${config.apiUrl}/qpsmeshblock?boundaryList=${boundaryIdList.join(',')}&startdate=${startUnix}&enddate=${endUnix}&offences=${offenceIdList.join(',')}`;
    if (isRequestStored(url)) {
        const crimes = reduceCrimes(JSON.parse(window.localStorage.getItem(url)))
        return Promise.resolve(crimes);
    }

    // TODO: wipe cache entries containing the url fragment as they are now invalid forever 

    return axios.get(url).then(res => {
        window.localStorage.setItem(url, JSON.stringify(res.data.Result));
        return reduceCrimes(res.data.Result);
    });
}


function isRequestStored(url) {
    return window.localStorage.getItem(url);
}

function reduceBoundaries(apiBoundaries) {
    return apiBoundaries.reduce(function (prev, current) {
        const polygons = processGeometryWkt(current.GeometryWKT);

        return [
            ...prev,
            new Boundary(current, polygons)
        ];
    }, []);
}

function reduceCrimes(apiCrimes) {
    return apiCrimes.reduce(function (prev, current) {
        const polygons = processGeometryWkt(current.GeometryWKT);
        let crime = new Crime(current, polygons);

        return [
            ...prev,
            crime,
        ]
    }, [])
}

/*
    processes a geometry reading
    returns an array of polygon/s
*/
function processGeometryWkt(geometryWkt) {
    if (geometryWkt.startsWith('POLYGON')) {
        const points = geometryWkt
            .replace('POLYGON ', '')
            .split('(').join('')
            .split(')').join('')
            .split(', ')
            .map(x => createLatLngFromApi(x));
        const filtered = points.filter(x => x[0] && x[1]);

        if (points.length !== filtered.length) {
            console.info('removed', points.length - filtered.length);
        }
        return [
            filtered
        ];
    } else if (geometryWkt.startsWith('MULTIPOLYGON')) {
        return geometryWkt
            .replace('MULTIPOLYGON ', '')
            // identify individual polygons
            .split('((').join('start')
            .split('))').join('close')
            // remove parenthesis
            .split('(').join('')
            .split(')').join('')
            .split('start').join('')
            .split('close').slice(0, -1)
            .map(polygon => {
                const points = polygon.split(', ').map(x => createLatLngFromApi(x));
                const filtered = points.filter(x => x[0] && x[1]);
                if (points.length !== filtered.length)
                    console.info('removed', points.length - filtered.length);

                return filtered;
            })
    }

    throw new Error('unsupported geometry shape');
}

export function tallyOffenceCount(offenceInfos) {
    return _.sum(offenceInfos.map(x => x.OffenceCount))
}

function createLatLngFromApi(latLngText) {
    const coords = latLngText.split(' ')
    const lat = coords[1]
    const lng = coords[0]
    return [parseFloat(lat), parseFloat(lng)]
}
