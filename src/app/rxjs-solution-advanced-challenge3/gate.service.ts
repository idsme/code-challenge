import {Injectable} from '@angular/core'
import {ArrivalFlight} from '../../../api/arrivals'
import {environment} from '../../environments/environment'
import {DepartureFlight} from '../../../api/departures'
import {Observable, Subscription} from 'rxjs'
import {HttpClient} from '@angular/common/http'
import {GateChange} from '../../../api/gate-changes'

@Injectable({
    providedIn: 'root'
})
export class GateService {

    constructor(private http: HttpClient) {
    }

    public getConfig(): Observable<ArrivalFlight> {
        return this.http.get<ArrivalFlight>('')
    }

    public getArrigvalFlights(): Observable<ArrivalFlight[]> {
        return this.http.get<ArrivalFlight[]>(environment.arrivalsUrl)
    }

    public getDepartureFlights(): Observable<DepartureFlight[]> {
        return this.http.get<DepartureFlight[]>(environment.arrivalsUrl)

    }

    public getGateChanges$(searchTerm: string): Observable<GateChange[]> {
        return this.http.get<GateChange[]>(environment.gateChangesUrl + searchTerm)
    }
}
