import HTTPService from './http.service';
import { CONSTANTS } from '../config/cloud-beds';
class UnitService {
    constructor() {
        this.http = new HTTPService();
        this.getAvailabiltyDates = () => {
            let currentMonth = `${new Date().getMonth() + 2}`;
            let nextMonth = `${new Date().getMonth() + 3}`;
            if (currentMonth.length == 1)
                currentMonth = `0${currentMonth}`;
            if (nextMonth.length == 1)
                nextMonth = `0${nextMonth}`;
            let startCurrentYear;
            let endCurrentYear;
            if (currentMonth == '01') {
                startCurrentYear = `${new Date().getFullYear() + 1}`;
                endCurrentYear = startCurrentYear;
            }
            else if (currentMonth == '12') {
                startCurrentYear = `${new Date().getFullYear()}`;
                endCurrentYear = `${new Date().getFullYear() + 1}`;
            }
            else {
                startCurrentYear = `${new Date().getFullYear()}`;
                endCurrentYear = `${new Date().getFullYear()}`;
            }
            return { 'startDate': `${startCurrentYear}-${currentMonth}-01`, 'endDate': `${endCurrentYear}-${nextMonth}-01` };
        };
        this.sortUnits = (unitTypes, areas) => {
            let sortedUnits = [];
            // key: area name / value: list of units
            let areasUnits = {};
            //Area that contains largest number of units
            let maximumAreaUnits = 0;
            for (let index = 0; index < areas.length; index++) {
                // if (!areasUnits[areas[index]]) {
                areasUnits[areas[index]] = unitTypes.filter(r => r.area.name == areas[index]);
                // } 
                // else {
                //   areasUnits[areas[index]].push(unitTypes.filter(r => r.area.name == areas[index]));
                // }
                if (areasUnits[areas[index]].length > maximumAreaUnits) {
                    maximumAreaUnits = areasUnits[areas[index]].length;
                }
            }
            for (let index = 0; index < maximumAreaUnits; index++) {
                for (let areaIndex = 0; areaIndex < areas.length; areaIndex++) {
                    if (areasUnits[areas[areaIndex]].length >= index + 1) {
                        let currentRoom = areasUnits[areas[areaIndex]][index];
                        sortedUnits.push(currentRoom);
                    }
                    else
                        continue;
                }
            }
            return sortedUnits;
        };
    }
    async getUnitTypes() {
        const roomsTypes = new Array();
        const availableDates = this.getAvailabiltyDates();
        const unitTypesResponse = await this.http.callAPI('GET', `${CONSTANTS.URL.GET_ROOM_TYPES}?startDate=${availableDates.startDate}&endDate=${availableDates.endDate}`);
        if (unitTypesResponse.data instanceof Array) {
            unitTypesResponse.data.forEach(unitType => {
                unitType.propertyRooms.forEach(room => {
                    roomsTypes.push({
                        unitTypeId: room.roomTypeID,
                        name: room.roomTypeName,
                        shortName: room.roomTypeNameShort
                    });
                });
            });
        }
        return roomsTypes;
    }
    async getAvailableRooms() {
        const normalizedObject = await this.prepareData();
        const response = this.sortUnits(normalizedObject.featuredUnitsFlatArray, normalizedObject.uniqueAreas);
        return response;
    }
    async prepareData() {
        const addresses = await this.getHotelsAddresses();
        const availableDates = this.getAvailabiltyDates();
        const availableUnitTypesResponse = await this.http.callAPI('GET', `${CONSTANTS.URL.GET_ROOM_TYPES}?startDate=${availableDates.startDate}&endDate=${availableDates.endDate}`);
        const featuredUnitsFlatArray = await this.handleUnitTypes(availableUnitTypesResponse, addresses.hotelsAddresses);
        return { 'featuredUnitsFlatArray': featuredUnitsFlatArray, 'uniqueAreas': addresses.hotelsAreas };
    }
    async getHotelsAddresses() {
        let hotelsAreas = [];
        let hotelsAddresses = [];
        let propertiesResponse = await this.http.callAPI('GET', CONSTANTS.URL.GET_HOTELS_DETAILS);
        if (propertiesResponse.data instanceof Array) {
            hotelsAddresses = propertiesResponse.data.map((p) => {
                return { 'propertyID': p.propertyID, 'address': p.propertyAddress };
            });
            hotelsAreas = [...new Set(propertiesResponse.data.map(a => a.propertyAddress.propertyCity))];
        }
        else {
            hotelsAddresses = [{ 'propertyID': propertiesResponse.data.propertyID, 'address': propertiesResponse.data.propertyAddress }];
            hotelsAreas = [propertiesResponse.data.propertyAddress.propertyCity];
        }
        return { hotelsAreas, hotelsAddresses };
    }
    async handleUnitTypes(availableUnitTypesResponse, hotelsAddresses) {
        let featuredUnitsFlatArray = [];
        if (availableUnitTypesResponse.data instanceof Array) {
            let unitsSorted = [];
            for (const u of availableUnitTypesResponse.data) {
                featuredUnitsFlatArray = await this.handleUnits(featuredUnitsFlatArray, u, unitsSorted, hotelsAddresses);
            }
            ;
        }
        return featuredUnitsFlatArray;
    }
    async handleUnits(featuredUnitsFlatArray, unitTypeObject, unitsSorted, propertyAddresses) {
        for (const r of unitTypeObject.propertyRooms) {
            unitsSorted.push({
                unitId: r.roomTypeID,
                name: r.roomTypeName,
                image: r.roomTypePhotos[0].image,
                area: {
                    areaId: propertyAddresses.filter(a => a.propertyID == unitTypeObject.propertyID)[0].address.propertyCity,
                    name: propertyAddresses.filter(a => a.propertyID == unitTypeObject.propertyID)[0].address.propertyCity
                },
                monthlyPrice: r.roomRate,
                currency: unitTypeObject.propertyCurrency,
                unitType: {
                    unitTypeId: r.roomTypeID,
                    name: r.roomTypeName,
                    shortName: r.roomTypeNameShort
                }
            });
            featuredUnitsFlatArray = featuredUnitsFlatArray.concat(unitsSorted);
        }
        ;
        return featuredUnitsFlatArray;
    }
}
export default UnitService;
//# sourceMappingURL=unit.service.js.map