import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {SearchResult} from '../../../api/gate-changes';
import {ArrivalFlight} from '../../../api/arrivals';
import {DepartureFlight} from '../../../api/departures';
import {FlightsHelper} from '../flights-helper';

// Technically this works... and meet all requirements...  but....
// What about:
// Debugablility, Testablility, Readablability, Findablility, Reuseablability, Predictability and Robustness.
// is this solution sustainable enough?
// Let's review together
@Component({
    selector: 'app-straigt-forward-solution-challenge',
    templateUrl: './straigt-forward-solution-challenge.component.html',
    styleUrls: ['./straigt-forward-solution-challenge.component.scss']
})
export class StraigtForwardSolutionChallengeComponent implements OnInit {

    // Basic solution, using ng model
    // Input changes value fire on key up...

    // TODO IDSME IMPROVEMENT SOC move this to environment config. // Better move this to App config Backend, then you can configure without re-deploying.
    private gateChangesUrl = 'http://localhost:3000/gate-changes/'; // move urls to environment.ts
    private arrivalsUrl = 'http://localhost:3000/arrivals';
    private departuresUrl = 'http://localhost:3000/departures';

    // Explanation: Purposeful initialization, leads to more robust app..
    // Pre-initializing gives less null pointers errors in dev / test / prod on edge cases
    // + less code. As constructor remains empty for now... ready for more complex inits of members if needed
    // Also this way we can run component in a sand-box or even develop it in one like story-book.
    // Actually a KLM Lean Maintenance rule.. in apps like CCI/FCM/CMO apps.
    private searchTerm = '';
    private searchResults: SearchResult[] = [];
    private arrivalFlights: ArrivalFlight[] = [];
    private departureFlights: DepartureFlight[] = [];

    // TODO IDSME SOC Better HttpClient in constructor
    constructor(private http: HttpClient) {
    }



    ngOnInit(): void {
        // TODO IDSME SOC server call in service
        this.http.get<ArrivalFlight[]>(this.arrivalsUrl).subscribe((arrivalFlights) => this.arrivalFlights = arrivalFlights);
        this.http.get<DepartureFlight[]>(this.departuresUrl).subscribe((departureFlights) => this.departureFlights = departureFlights);

        // TODO IDSME CLEAN JIRA-XXX1 when done developing.
        this.searchTerm = 'KL';
        this.searchForGateChanges(this.searchTerm);
    }

    // TODO IDSME Clarity > We search here but we do so much more... which is relatively undocumented as it is not in separate functions
    searchForGateChanges(searchTerm: string) {
        // As results in BE are only uppercase.
        this.searchTerm = searchTerm.toUpperCase();
        if (this.searchTerm.length > 1) {
            return this.http.get(this.gateChangesUrl + this.searchTerm).subscribe((responseData: SearchResult[]) => {
                // clear previous search Results as new one where retrieved
                this.searchResults = [];
                // limit new results to five
                responseData = responseData.splice(0, 5);
                // TODO IDSME OO MAINTAINABILITY as separate function.
                // cleaning up readability, testability etc.
                responseData.forEach((searchResult) => {
                    if ('Arrival' === searchResult.direction) {
                        searchResult = FlightsHelper.addFlightDataToSearchResult(searchResult, this.arrivalFlights);
                    } else if ('Departure' === searchResult.direction) {
                        searchResult = FlightsHelper.addFlightDataToSearchResult(searchResult, this.departureFlights);
                    } else {
                        // Purposeful>> Robust/Defensive programming by explicit else with comment..
                        // helps debug-ability when something goes wrong, actually saving more time then it costs to code as you would expect as systems/data/people are never perfect.
                        console.error('Flight Direction missing from searchResult for:', searchResult);
                    }
                    this.searchResults.push(searchResult);
                }); // forEach
                // TODO IDSME TESTABILITY could be in separate method.. thus method name documents puprpose.
                this.searchResults = this.searchResults.sort(FlightsHelper.sortFlightsArrayOnEventDates); // let's sort results on Flight event dates.
            }); // http.get
        } else if (this.searchTerm.length === 0) {
            // We are typing so current results are considered old so.. remove
            this.searchResults = [];
        }
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
// Cleaner solution and more coverage
