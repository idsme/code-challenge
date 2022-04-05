import {TestBed} from '@angular/core/testing'

import {GateService} from './gate.service'
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing'

describe('GateService', () => {
    let service: GateService
    let httpController: HttpTestingController

    // Arrange Globally
    const expected = [{
        flightNumber: 'CND0001'
    }, {
        flightNumber: 'CND0002'
    }
    ]

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        })
        service = TestBed.inject(GateService)
        httpController = TestBed.inject(HttpTestingController)
    })

    it('should be created', () => {
        expect(service).toBeTruthy()
    })

    // WORKING, but is it nice enough?
    it('should do a call to the backend /arrivals and get an array of ArrivalFlights[]', done => {
        // act
        service.getArrivalFlights().subscribe((result) => {
            // assert
            expect(result).toEqual(expected)
            done()
        })

        const req = httpController.expectOne({
            method: 'GET',
            url: `http://localhost:3000/arrivals`
        })

        req.flush(expected)
    })

    it('should do a call to the backend /departures and get an array of DepartureFlight[]', done => {
        // act
        service.getDepartureFlights().subscribe((result) => {
            // assert
            expect(result).toEqual(expected)
            done()
        })

        const req = httpController.expectOne({
            method: 'GET',
            url: `http://localhost:3000/departures`
        })

        req.flush(expected)
    })

    it('should do a call to the backend /gate-changes and get an array of GateChange[]', done => {
        // act
        service.getGateChanges$('').subscribe((result) => {
            // assert
            expect(result).toEqual(expected)
            expect(result).toHaveLength(2)
            done()
        })

        const req = httpController.match({
                method: 'GET',
                url: `http://localhost:3000/gate-changes`
            });
        expect(req.length).toBe(1);

       req.forEach(result => result.flush(expected))
    })

    it('should do a call to the backend /gate-changes and get an array of GateChange[]', done => {
        // act
        service.getGateChanges$('').subscribe((result) => {
            // assert
            expect(result).toEqual(expected)
            expect(result).toHaveLength(2)
            done()
        })

        const req = httpController.expectOne({
            method: 'GET',
            url: `http://localhost:3000/gate-changes`
        })

        req.flush(expected)
    })

})
