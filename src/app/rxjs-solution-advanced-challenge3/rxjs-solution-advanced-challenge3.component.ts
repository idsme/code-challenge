import {Component, OnDestroy, OnInit} from '@angular/core'
import {forkJoin, fromEvent} from 'rxjs'
import {GateChange, SearchResult} from '../../../api/gate-changes'
import {debounceTime, distinctUntilChanged, map, skip, skipWhile, switchMap, tap} from 'rxjs/operators'
import {FlightsHelper} from '../flights-helper'
import {GateService} from './gate.service'
import {ArrivalFlight} from '../../../api/arrivals'
import {DepartureFlight} from '../../../api/departures'

@Component({
    selector: 'app-rxjs-solution-advanced-challenge3',
    templateUrl: './rxjs-solution-advanced-challenge3.component.html',
    styleUrls: ['./rxjs-solution-advanced-challenge3.component.scss']
})
export class RxjsSolutionAdvancedChallenge3Component implements OnInit, OnDestroy {

    private searchInputSubscription
    private searchResults: GateChange[] = []

    constructor(public gateService: GateService) {
    }

    ngOnInit(): void {
        this.listenToSearhTermInput()
        this.searchForGateChanges()
    }

    private listenToSearhTermInput() {
        this.searchInputSubscription = fromEvent(document.getElementById('search-term'), 'keyup')
    }


// TODO IDSME Clarity > We search here but we do so much more... which is relatively undocumented as it is not in separate functions
    // TODO IDSME good stuff to write an artical about... Before RxJS and After RxJS and should this have an integration test?
    // Test 1 character no new data.
    // Test 2 characters search backend. (Just one call if typed fast)
    // Test 3 onclear after search no results should be on screen.
    searchForGateChanges() {
        this.searchInputSubscription
            .pipe(
                tap(() => this.searchResults = []),
                debounceTime(200),
                map((e: any) => e.target.value), // Can we get rid of the any here?
                skipWhile((data: string) => data.length < 2 ), // Not descriptive
                distinctUntilChanged(),
                map((data: string) => data.toUpperCase()),
                switchMap((searchTerm: string) => forkJoin(this.gateService.getGateChanges(searchTerm), this.gateService.getArrivalFlights(), this.gateService.getDepartureFlights())),
                map(([gateChanges, resultDataArrivals, resultDataDepartures]) => [gateChanges.splice(0, 5), resultDataArrivals, resultDataDepartures]),
                map( ([gateChanges, resultDataArrivals, resultDataDepartures]) => this.aggregateResponseDataToSearchResults(gateChanges as GateChange[], resultDataArrivals as ArrivalFlight[], resultDataDepartures as DepartureFlight[])),
                map((searchResults: SearchResult[]) => searchResults.sort(FlightsHelper.sortFlightsArrayOnEventDates))
            ).subscribe((searchResults: SearchResult[]) => {
            this.searchResults = searchResults
        })

    }

    private aggregateResponseDataToSearchResults(responseData: GateChange[], resultDataArrivals: ArrivalFlight[], resultDataDepartures: DepartureFlight[]): SearchResult[] {
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

    ngOnDestroy(): void {
        this.searchInputSubscription.unsubscribe()
    }
}

// Sustainability check!
// Maintainability / Readability 4
// Testability = 0 => No Tests...
// Debugability = 0 => No Test... thus => Add console logs => Remove console logs.
// Findability = 4 => Monolitic Component
// Reusability = 0 => Component is not reusable for anything else
// Deployability = 0 => As URL's are also in component
// Upgradeability = 8 => Angular version lower then 9 = 4
// Predicatability = 2 => Is solution easy to learn....  <<Recommened best-practices followed>>
// Lean Enough = 2 => Generate API swagger services and Be models.

// Advice more
// ??

