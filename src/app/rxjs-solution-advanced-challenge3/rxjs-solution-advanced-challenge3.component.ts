import {Component, OnInit} from '@angular/core'
import {forkJoin, fromEvent, Observable} from 'rxjs'
import {SearchResult} from '../../../api/gate-changes'
import {distinctUntilChanged, switchMap } from 'rxjs/operators'
import {FlightsHelper} from '../flights-helper'
import {GateService} from './gate.service'
import {AutoCompleteHelper} from './auto-complete-helper'

@Component({
    selector: 'app-rxjs-solution-advanced-challenge3',
    templateUrl: './rxjs-solution-advanced-challenge3.component.html',
    styleUrls: ['./rxjs-solution-advanced-challenge3.component.scss']
})
export class RxjsSolutionAdvancedChallenge3Component implements OnInit {

    private searchInputSubscription: Observable<Event>
    private resultsSubscription: Observable<SearchResult[]>

    constructor(public gateService: GateService) {
    }

    ngOnInit(): void {
        this.searchInputSubscription = this.listenToSearhTermInput()
        this.resultsSubscription = this.searchForGateChanges(this.searchInputSubscription)
    }

    private listenToSearhTermInput() {
        return fromEvent(document.getElementById('search-term'), 'keyup')
    }

    // TODO IDSME Clarity > we could just not wrap in helper methods but then intent of each line will be less clear.
    // TODO IDSME good stuff to write an article about... Before RxJS and After RxJS and should this have an integration test?
    // Test 1 character no new data.
    // Test 2 characters search backend. (Just one call if typed fast)
    // Test 3 onClear after search no results should be on screen.
    public searchForGateChanges(searchInputSubscription: Observable<Event>) {
        return searchInputSubscription
            .pipe(
                AutoCompleteHelper.waitForUserToStopTypingForXMilliseconds$(200),
                AutoCompleteHelper.extractValueFromInput$(),
                AutoCompleteHelper.skipIfLengthOfSearchTermIsShorterThen$(2),
                distinctUntilChanged(), // If value the same don't stop processing.
            ).pipe(
                AutoCompleteHelper.mapValueToUpperCase$(),
                switchMap((searchTerm: string) => forkJoin(this.gateService.getGateChanges(searchTerm), this.gateService.getArrivalFlights(), this.gateService.getDepartureFlights())),
                AutoCompleteHelper.limitNumberOfResults$(),
                FlightsHelper.aggregateResponseDataToSearchResultsViewModel$(),
                FlightsHelper.sortFlightsArrayOnEventDates$()
            )
    }
}

// Sustainability check!
// Maintainability / Readability 4
// Testability = 8 => No Tests...
// Debugability = 0 => No Test... thus => Add console logs => Remove console logs.
// Findability = 9 => Is everything in the right location and has it got the best name I could think of?
// Reusability = 9 => First 5 method within pipe function are same for all auto completes
// Deployability = 10 => Url's are configurable via environment variables.
// Upgradability = 8 => Have we got enough test to perform a regression test? After upgrading libs?
// Predicatability = 7 => Is solution easy to learn....  <<Recommened best-practices followed>>
// Lean Enough = 2 => Generate API swagger services and Be models.

// Advice more
// ??

