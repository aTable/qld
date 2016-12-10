import OffenceTypes from './OffenceTypes';
export default class Crime {

    constructor(apiCrime, polygons) {
        apiCrime.OffenceInfo = apiCrime.OffenceInfo.map(x => {
            x.offenceType = OffenceTypes.find(oi => oi.value === x.QpsOffenceCode).name;
            return x;
        });


        // duplicate api object properties
        for (var prop in apiCrime) {
            if (apiCrime.hasOwnProperty(prop)) {
                this[prop] = apiCrime[prop];
            }
        }



        this.polygons = polygons;
    }

}