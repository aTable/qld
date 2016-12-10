/*
    A boundary retrieved from the api
    property names are intentionally capitalized
    (where applicable) as a reminder that they
     originate from the data source
    and not from within the app
*/
export default class Boundary {
    
    constructor(apiBoundary, polygons) {
        // duplicate api object properties as suburbs, postcodes etc vary
        for (var prop in apiBoundary) {
            if (apiBoundary.hasOwnProperty(prop)) {
                this[prop] = apiBoundary[prop];
            }
        }

        this.polygons = polygons;
    }

    get id() {
        switch (this.boundaryType) {
            case Boundary.BoundaryTypes.postcode:
                return this.QldPostcodeId;

            case Boundary.BoundaryTypes.suburb:
                return this.QldSuburbId;

            case Boundary.BoundaryTypes.localGovernmentArea:
                return this.LocalGovtAreaId;

            case Boundary.BoundaryTypes.neighbourhoodWatch:
                return this.NeighbourhoodWatchId;

            case Boundary.BoundaryTypes.qpsRegion:
                return this.QpsAreaId;
            case Boundary.BoundaryTypes.qpsDistrict:
            case Boundary.BoundaryTypes.qpsDivision:
            default:
                throw new Error('unsupported boundary type');
        }
    }

    get boundaryType() {
        if (this.QldPostcodeId) {
            return Boundary.BoundaryTypes.postcode;
        } else if (this.QldSuburbId) {
            return Boundary.BoundaryTypes.suburb;
        } else if (this.LocalGovtAreaId) {
            return Boundary.BoundaryTypes.localGovernmentArea;
        } else if (this.NeighbourhoodWatchId) {
            return Boundary.BoundaryTypes.neighbourhoodWatch;
        } else if (this.QpsAreaId) {
            // TODO: check what QpsAreaId maps to: is it a region,. distrcit or division?
            return Boundary.BoundaryTypes.qpsRegion;
        }

        throw new Error('unsupported boundary type');

    }

    static get BoundaryTypes() {
        return {
            suburb: 1,
            postcode: 2,
            localGovernmentArea: 3,
            neighbourhoodWatch: 4,
            qpsRegion: 5,
            qpsDistrict: 6,
            qpsDivision: 7,
        }
    }
}