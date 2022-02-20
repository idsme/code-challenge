import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {fromEvent, Subscription} from 'rxjs';
import {GateChange} from '../../../api/gate-changes';
import {HttpClient} from '@angular/common/http';
import {debounceTime, distinctUntilChanged, map, switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs-solution-advanced-challenge3',
  templateUrl: './rxjs-solution-advanced-challenge3.component.html',
  styleUrls: ['./rxjs-solution-advanced-challenge3.component.scss']
})
export class RxjsSolutionAdvancedChallenge3Component implements AfterViewInit {

    mainForm = new FormGroup({ searchTerm: new FormControl('B3')});
    private searchTermSubscriptionAfter!: Subscription;


    private url = 'http://localhost:3000/gate-changes/';
    private searchResults: GateChange[] = [];

    constructor(private http: HttpClient) {
        // Getting notified about changes
        // Option 1 Tested oke
        // this.mainForm.valueChanges.subscribe((formDataChange) => {
        //     console.log('Listening to form group value change,', formDataChange);
        // });

    }

    ngAfterViewInit(): void {
        this.searchTermSubscriptionAfter = fromEvent(document.getElementById('search-term'), 'keyup')
            .pipe(
                debounceTime(200),
                map((e: any) => e.target.value),
                distinctUntilChanged(),
                switchMap((searchTerm) =>  this.http.get(this.url + searchTerm)),
                tap((c: string) => document.getElementById('output-search-term').innerText = JSON.stringify(c))
            ).subscribe(data => console.log('Subscribe to searchTerm change event after_init', data));
    }

}
