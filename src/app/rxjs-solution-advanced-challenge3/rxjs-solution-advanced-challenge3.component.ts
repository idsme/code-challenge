import {Component, OnDestroy, OnInit} from '@angular/core'
import {forkJoin, fromEvent} from 'rxjs'
import {GateChange, SearchResult} from '../../../api/gate-changes'
import {distinctUntilChanged, switchMap, tap} from 'rxjs/operators'
import {FlightsHelper} from '../flights-helper'
import {GateService} from './gate.service'
import {AutoCompleteHelper} from './auto-complete-helper'

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
    // Test 3 onClear after search no results should be on screen.
    searchForGateChanges() {
        this.searchInputSubscription
            .pipe(
                this.clearPreviouslyRetrievedResults(),
                AutoCompleteHelper.waitForUserToStopTyping$(200),
                AutoCompleteHelper.extractValueFromInput$(),
                AutoCompleteHelper.skipIfLengthOfSearchTermIsShorterThen$(2),
                distinctUntilChanged(),
                AutoCompleteHelper.mapValueToUpperCase$(),
                switchMap((searchTerm: string) => forkJoin(this.gateService.getGateChanges(searchTerm), this.gateService.getArrivalFlights(), this.gateService.getDepartureFlights())),
                AutoCompleteHelper.limitNumberOfResults$(),
                FlightsHelper.aggregateResponseDataToSearchResultsViewModel$(),
                FlightsHelper.sortFlightsArrayOnEventDates$()
            ).subscribe((searchResults: SearchResult[]) => {
            this.searchResults = searchResults
        })
    }

    private clearPreviouslyRetrievedResults() {
        return tap(() => this.searchResults = [])
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

