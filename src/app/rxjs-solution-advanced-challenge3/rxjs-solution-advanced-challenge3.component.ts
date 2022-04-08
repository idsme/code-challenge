import {Component, OnDestroy, OnInit} from '@angular/core'
import {forkJoin, fromEvent} from 'rxjs'
import {GateChange, SearchResult} from '../../../api/gate-changes'
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators'
import {ArrivalFlight} from '../../../api/arrivals'
import {DepartureFlight} from '../../../api/departures'
import {FlightsHelper} from '../flights-helper'
import {GateService} from './gate.service'

@Component({
    selector: 'app-rxjs-solution-advanced-challenge3',
    templateUrl: './rxjs-solution-advanced-challenge3.component.html',
    styleUrls: ['./rxjs-solution-advanced-challenge3.component.scss']
})
export class RxjsSolutionAdvancedChallenge3Component implements OnInit, OnDestroy {

    private searchInputSubscription
    private searchResults: GateChange[] = []
    private arrivalFlights: ArrivalFlight[] = []
    private departureFlights: DepartureFlight[] = []

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
    searchForGateChanges() {
        this.searchInputSubscription
            .pipe(
                debounceTime(200),
                map((e: any) => e.target.value),
                distinctUntilChanged(),
                tap((data) => console.log('Search Term Found after debounce filtering:>', data)),
                switchMap((searchTerm: string) =>
                {
                    return forkJoin(this.gateService.getGateChanges(searchTerm), this.gateService.getArrivalFlights(), this.gateService.getDepartureFlights());
                })
            ).subscribe(([responseData, resultDataArrivals, resultDataDepartures]) => {

            // clear previous search Results as new one where retrieved
            this.searchResults = []
            // limit new results to five
            responseData = responseData.splice(0, 5)
            // TODO IDSME OO MAINTAINABILITY as separate function.
            // cleaning up readability, testability etc.
            responseData.forEach((searchResult: SearchResult) => {
                if ('Arrival' === searchResult.direction) {
                    console.log(`Arrival>>>${searchResult}`, searchResult)
                    searchResult = FlightsHelper.addFlightDataToSearchResult(searchResult, resultDataArrivals)
                } else if ('Departure' === searchResult.direction) {
                    console.log(`Departure>>>${searchResult}`, searchResult)
                    searchResult = FlightsHelper.addFlightDataToSearchResult(searchResult, resultDataDepartures)
                } else {
                    // Purposeful>> Robust/Defensive programming by explicit else with comment..
                    // helps debug-ability when something goes wrong, actually saving more time then it costs to code as you would expect as systems/data/people are never perfect.
                    console.error('Flight Direction missing from searchResult for:', searchResult)
                }
                this.searchResults.push(searchResult)
            }) // forEach
            // TODO IDSME TESTABILITY could be in separate method.. thus method name documents puprpose.
            this.searchResults = this.searchResults.sort(FlightsHelper.sortFlightsArrayOnEventDates) // let's sort results on Flight event dates.
        })

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

