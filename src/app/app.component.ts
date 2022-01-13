import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GateChange} from '../../api/gate-changes';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
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
