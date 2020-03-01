import React from 'react'

const About = () => {
  return (
    <div className="container">
      <h1>Data</h1>
      <p>
        This is purely a visualization of the <strong>data that is generated and held data.qld.gov.au</strong>
      </p>

      <table className="table table-bordered table-dark table-striped">
        <thead>
          <tr>
            <td>Dataset</td>
            <td>License</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a target="_blank" rel="noopener noreferrer" href="https://www.data.qld.gov.au/dataset/crime-locations-2000-present">
                QPS
              </a>
            </td>
            <td>
              <a target="_blank" rel="noopener noreferrer" href="https://creativecommons.org/licenses/by/3.0/au/">
                Creative Commons Attribution 3.0 license
              </a>
            </td>
          </tr>
          <tr>
            <td>
              <a target="_blank" rel="noopener noreferrer" href="https://carto.com/location-data-services/basemaps/">
                Map tiles by Carto
              </a>
            </td>
            <td>
              <a target="_blank" rel="noopener noreferrer" href="https://opendatacommons.org/licenses/odbl/index.html">
                under CC BY 3.0. Data by OpenStreetMap, under ODbL.
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default About
