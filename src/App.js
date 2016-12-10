import React, { Component, } from 'react';
import './App.css';
import moment from 'moment';
import L from 'leaflet'; 
import 'leaflet/dist/leaflet.css'; 
import 'tether/dist/css/tether.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';

import TimeRanges from './models/TimeRanges';
import OffenceTypes from './models/OffenceTypes';
import OffenceTypesForm from './components/OffenceTypesForm';
import TimeRangesForm from './components/TimeRangesForm';
import { getBoundariesByName, getCrime, tallyOffenceCount, } from './api';


export default class App extends Component {
    constructor() {
        super();
        const brisbanePosition = [-27.470125, 153.021072];
        const usersLocation = JSON.parse(window.localStorage.getItem('usersLocation'));

        this.state = {
            mapLocation: usersLocation || brisbanePosition,
            isGeometricalDataRequest: true,
            maxResults: 10,
            message: 'i see you',
            boundaryFilter: window.localStorage.getItem('lastBoundary') || '',

            solvedCrimeCount: null,
            unsolvedCrimeCount: null,
            crimeCount: null,

            crimesWithResolution: OffenceTypes.map(x => {
                x.solved = null;
                x.unsolved = null;
                return x;
            }),

        };

        this.map = null;
        this.mapPolygons = [];
        const rootMoment = moment().startOf('week');
        this.startDateMoment = rootMoment.clone();
        this.endDateMoment = rootMoment.clone();

        // cache bust    
        // let lastCacheBusted = window.localStorage.getItem('lastCacheBustedUnix');
        // if (!lastCacheBusted) {
        //     lastCacheBusted = parseInt(rootMoment.format('X'), 10);
        //     window.localStorage.setItem('lastCacheBustedUnix', parseInt(rootMoment.format('X'), 10))
        // }

        // const lastCacheBustedUnix = parseInt(lastCacheBusted, 10);
        // if (moment(lastCacheBustedUnix).add(3, 'seconds').isAfter(rootMoment)) {
        //     console.log('cache busting');
        //     window.localStorage.setItem('lastCacheBustedUnix', parseInt(rootMoment.format('X'), 10))
        // }

    }

    clearMap() {
        this.mapPolygons.forEach(x => {
            this.map.removeLayer(x);
        });
        this.mapPolygons = [];
    }

    submit(e) {
        e.preventDefault();

        let offenceIds = [];
        e.target.offencetypes.forEach(x => {
            if (x.checked) {
                offenceIds.push(parseInt(x.value, 10));
            }
        });

        if (offenceIds.length === 0) {
            console.warning('no offense type specified!')
            return;
        }

        let startMoment = this.startDateMoment.clone();
        switch (e.target.timeranges.value) {
            case TimeRanges.week:
                startMoment.subtract(7, 'day');
                break;

            case TimeRanges.month:
                startMoment.subtract('1', 'month')
                break;

            case TimeRanges.year:
                startMoment.subtract(1, 'year');
                break;

            case TimeRanges.range:
            default:
                throw new Error('unsupported');
        }

        this.crunchCrime(offenceIds, startMoment);
    }

    crunchCrime(offenceIds, startMoment) {
        this.clearMap();
        this.findBoundaries()
            .then(boundaries => {
                const boundaryIds = boundaries.map(x => `${x.boundaryType}_${x.id}`);
                boundaries.forEach(boundary => {
                    this.drawPolygons(boundary.polygons, { color: 'green' });
                });
                this.map.setView(boundaries[0].polygons[0][0]);
                return Promise.resolve(boundaryIds);
            })
            .then(boundaryIds => {
                getCrime(boundaryIds, offenceIds, parseInt(startMoment.format('X'), 10), parseInt(this.endDateMoment.format('X'), 10))
                    .then(crimes => {
                        const offenceInfos = crimes.reduce((prev, current) => {
                            return [
                                ...prev,
                                ...current.OffenceInfo
                            ]
                        }, []);
                        const unsolved = offenceInfos.filter(x => x.Solved === false);
                        const solved = offenceInfos.filter(x => x.Solved);

                        crimes.forEach(c => {
                            this.drawPolygons(c.polygons, {});
                            c.OffenceInfo.forEach(o => {
                            });
                        });

                        const crimesWithResolution = this.state.crimesWithResolution.reduce(function (prev, current) {
                            const matches = offenceInfos.filter(x => x.QpsOffenceCode === current.value);
                            current.solved = matches.filter(x => x.Solved).length;
                            current.unsolved = matches.filter(x => x.Solved === false).length;
                            return [
                                ...prev,
                                current,
                            ];
                        }, []);

                        this.setState({
                            unsolvedCrimeCount: tallyOffenceCount(unsolved),
                            solvedCrimeCount: tallyOffenceCount(solved),
                            crimeCount: tallyOffenceCount(offenceInfos),
                            crimesWithResolution,
                        });
                    })
            })
    }

    findBoundaries() {
        return getBoundariesByName(this.state.boundaryFilter)
            .then(boundaries => {
                window.localStorage.setItem('lastBoundary', this.state.boundaryFilter);
                return Promise.resolve(boundaries);
            });
    }

    drawPolygons(polygons, options) {
        polygons.forEach(x => this.mapPolygons.push(L.polygon(x, options).addTo(this.map)))
    }

    mapClicked(e) {
        //getBoundariesByLocation(e.latlng.lat, e.latlng.lng);
    }

    boundaryFilterChange(e) {
        this.setState({ boundaryFilter: e.target.value, })
    }

    componentDidMount() {
        this.map = L.map('map').setView(this.state.mapLocation, 13);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);

        this.map.on('click', this.mapClicked);
        $('[data-toggle="tooltip"]').tooltip();
        const processPosition = (position) => {
            const location = [position.coords.latitude, position.coords.longitude]
            this.setState({ mapLocation: location, });
            window.localStorage.setItem('usersLocation', JSON.stringify(location));
            this.map.setView(this.state.mapLocation);
        }
        navigator.geolocation.getCurrentPosition(processPosition);

    }

    render() {
        return (
            <div className="container-fluid" >
                <div className="row">
                    <div id="left-sidebar" className="col-xs-5 col-sm-3">
                        <p className="text-center">{this.state.message}</p>
                        <form onSubmit={this.submit.bind(this)}>
                            <div className="form-group">
                                <input id="boundary" className="form-control" type="text" value={this.state.boundaryFilter} onChange={this.boundaryFilterChange.bind(this)} placeholder="boundary" />
                                <abbr data-toggle="tooltip" data-placement="right" title="suburbs, postcodes, local government areas, QPS regions/districts/divisions, and Neighbourhood Watch areas.">?</abbr>
                            </div>

                            <TimeRangesForm />

                            <fieldset id="statistics" className="form-group">
                                <legend hidden>statistics</legend>
                                <p>total: {this.state.crimeCount}</p>
                                <p className="text-success">solved: {this.state.solvedCrimeCount}</p>
                                <p className="text-danger">unsolved: {this.state.unsolvedCrimeCount}</p>
                            </fieldset>

                            <OffenceTypesForm crimes={this.state.crimesWithResolution} />

                            <div className="form-group">
                                <button className="btn btn-info btn-block" type="submit">find crime</button>
                            </div>

                        </form>
                    </div>

                    <div id="map-container" className="col-xs-7 col-sm-9">
                        <div id="map" ref="map"></div>
                    </div>
                </div>
                <p>The data has not been modified and is available from the <a href="https://data.qld.gov.au/dataset/crime-locations-2000-present">Queensland Police Service</a> under the <a href="https://creativecommons.org/licenses/by/3.0/au/">Creative Commons Attribution 3.0 license</a> </p>
            </div>
        );
    }
}
