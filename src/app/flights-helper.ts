import {GateChange, SearchResult} from '../../api/gate-changes'
import {ArrivalFlight} from '../../api/arrivals'
import {DepartureFlight} from '../../api/departures'
import {map} from 'rxjs/operators'

export class FlightsHelper {

    // Move to separate component
    public static sortFlightArray(a, b) {
        if (a.passengers === b.passengers) {
            return 0;
        }

        if (a.passengers < b.passengers) {
            return -1;
        } else {
            return 1;
        }
    }

    public static sortFlightsArrayOnEventDates(a: SearchResult, b: SearchResult) {

        //As we equalness without converting.. if timezone is same...which is the case.
        if (a === b) {
            return 0;
        }

        // Convert
        console.log(`a.arrivalTime:${a.arrivalTime} a.departureTime:${a.departureTime}`);
        console.log(`b.arrivalTime:${b.arrivalTime} b.departureTime:${b.departureTime}`);
        let aDate: number;
        if (a.arrivalTime) {
            console.log(`found arrivalTime: ${a.arrivalTime}`);
            aDate = Date.parse(a.arrivalTime);
            //aDate = Date.parse("2019-06-16T06:45:00.000Z"); // This works
            console.log(`Result of conversion : ${aDate}`);
        } else {
            console.log(`found departure time: ${a.departureTime}`);
            aDate = Date.parse(a.departureTime);
            console.log(`Result of conversion : ${aDate}`);
        }
        //const aDate = (a.arrivalTime) ? Date.parse(a.arrivalTime) : Date.parse(a.departureTime);
        const bDate = (b.arrivalTime) ? Date.parse(b.arrivalTime) : Date.parse(b.departureTime);

        if (aDate > bDate) {
            console.log(`a ${aDate} is bigger the b ${bDate}`);
            return 1;
        } else if (aDate < bDate) {
            console.log(`a ${aDate} is smaller the b ${bDate}`);
            return -1;
        } else { // Thus if something is without a parsable date they will be lumbed together at end of list
            if (isNaN(aDate)) { // Thus if something is without a parable date they will be lumbed together at end of list
                console.log(`aDate is found to be unparseable: ${aDate}`);
            }
            if (isNaN(bDate)) { // Thus if something is without a parsable date they will be lumbed together at end of list
                console.log(`bDate is found to be unparseable: ${bDate}`);
            }
            return -1;
        }
    }

    // TODO IDSME SOC Helper Method to Helper class
    public static addFlightDataToSearchResult(searchResult: SearchResult, flight: ArrivalFlight[] | DepartureFlight[]) {
        const index = this.getIndex(searchResult, flight);
        console.log(`flight index found`, index, searchResult, flight[index]);
        return {...searchResult, ...flight[index]};
    }

    // TODO IDSME SOC Helper Method to Helper class
    // If it is not a function testing becomes more difficult. As it is wrapped in another function
    public static getIndex(searchResult: SearchResult, flights: ArrivalFlight[] | DepartureFlight[]) {
        return flights.findIndex((flight => flight.flightNumber === searchResult.flightNumber));
    }

    // TODO IDSME testing this out..to see how easily this is testable.
    public static limitResults(sizeLimit = 5) {
        return map((gateChanges: GateChange[]) => gateChanges.splice(0, sizeLimit))
    }

    public static limitNumberOfResults$(sizeLimit = 5) {
        return map(([gateChanges, resultDataArrivals, resultDataDepartures]) => [FlightsHelper.limitNumberOfResults(gateChanges), resultDataArrivals, resultDataDepartures])
    }

    public static limitNumberOfResults(items: any[], sizeLimit = 5)
    {
        return items.splice(0, sizeLimit)
    }

    public static aggregateResponseDataToSearchResultsViewModel(responseData: GateChange[], resultDataArrivals: ArrivalFlight[], resultDataDepartures: DepartureFlight[]): SearchResult[] {
        const searchResults: SearchResult[] = [];
        responseData.forEach((searchResult: SearchResult) => {
            if ('Arrival' === searchResult.direction) {
                console.log(`Arrival>>>${searchResult}`, searchResult)
                searchResult = FlightsHelper.addFlightDataToSearchResult(searchResult, resultDataArrivals)
            } else if ('Departure' === searchResult.direction) {
                console.log(`Departure>>>${searchResult}`, searchResult)
                searchResult = FlightsHelper.addFlightDataToSearchResult(searchResult, resultDataDepartures)
            } else {
                console.error('Flight Direction missing from searchResult for:', searchResult)
            }
            searchResults.push(searchResult)
        }) // forEach
        return searchResults;
    }

}
