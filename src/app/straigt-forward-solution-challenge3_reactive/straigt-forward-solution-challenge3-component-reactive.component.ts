import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GateChange} from '../../../api/gate-changes';
import {FormControl, FormGroup} from '@angular/forms';

// This solution uses reactive From to solve the puzzle.
@Component({
    selector: 'app-straigt-forward-solution-challenge3-reactive-form',
    templateUrl: './straigt-forward-solution-challenge3-component-reactive.component.html',
    styleUrls: ['./straigt-forward-solution-challenge3-component-reactive.component.scss']
})
export class StraigtForwardSolutionChallenge3ComponentReactiveForm {

    mainForm = new FormGroup({ searchTerm: new FormControl('B3')});

    private url = 'http://localhost:3000/gate-changes/';
    private searchTerm = '';
    private searchResults: GateChange[] = [];

    constructor(private http: HttpClient) {
    }

    // Currently have one call. So component simple enough.
    // When more functionality is added to this component move http call to a service.
    searchForGateChanges$(searchTerm: string) {
        if (this.searchTerm.length > 1) {
            return this.http.get(this.url + searchTerm).subscribe((responseData: GateChange[]) => {
                    this.searchResults = responseData.splice(0, 5);
                }
            );
        } else if (this.searchTerm.length === 0) {
            this.searchResults = [];
        }
    }
}
