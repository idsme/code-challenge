import {FlightsHelper} from './flights-helper';
import {GateChange, SearchResult} from '../../api/gate-changes'
import {of} from 'rxjs'
import {tap} from 'rxjs/operators'

describe('FlightsHelper', () => {
    const arrivalFlightA = {arrivalTime: '2019-01-01T00:00:00.000Z'} as SearchResult;
    const arrivalFlightB = {arrivalTime: '2019-10-01T00:00:00.000Z'} as SearchResult;

    const departureFlightA = {departureTime: '2019-02-01T00:00:00.000Z'} as SearchResult;
    const departureFlightB = {departureTime: '2019-11-01T00:00:00.000Z'} as SearchResult;

    const gateChange1: GateChange =     { currentGate: '1'} as GateChange;


    it('should create an instance', () => {
        expect(new FlightsHelper()).toBeTruthy();
    });

    describe('arrival flights only', () => {
        it('should sort same type flight asc, result should be -1', () => {
            const result = FlightsHelper.sortFlightsArrayOnEventDates(arrivalFlightA, arrivalFlightB);
            expect((result)).toBe(-1);
        });

        it('should sort flight asc input is desc, result should be 1', () => {
            const result = FlightsHelper.sortFlightsArrayOnEventDates(arrivalFlightB, arrivalFlightA);
            expect((result)).toBe(1);
        });

        it('should not sort as are equal', () => {
            const result = FlightsHelper.sortFlightsArrayOnEventDates(arrivalFlightA, arrivalFlightA);
            expect((result)).toBe(0);
        });
    });

    describe('departure flights only', () => {
        it('should sort same type flight asc, result should be -1', () => {
            const result = FlightsHelper.sortFlightsArrayOnEventDates(departureFlightA, departureFlightB);
            expect((result)).toBe(-1);
        });

        it('should sort flight asc input is desc, result should be 1', () => {
            const result = FlightsHelper.sortFlightsArrayOnEventDates(departureFlightB, departureFlightA);
            expect((result)).toBe(1);
        });

        it('should not sort as are equal', () => {
            const result = FlightsHelper.sortFlightsArrayOnEventDates(departureFlightA, departureFlightA);
            expect((result)).toBe(0);
        });
    });

    describe('mixed flights only', () => {
        it('should sort same type flight asc, result should be -1', () => {
            const result = FlightsHelper.sortFlightsArrayOnEventDates(arrivalFlightA, departureFlightB);
            expect((result)).toBe(-1);
        });

        it('should sort flight asc input is desc, result should be 1', () => {
            const result = FlightsHelper.sortFlightsArrayOnEventDates(departureFlightB, arrivalFlightA);
            expect((result)).toBe(1);
        });

    });

    describe('Testing rxjs autocomplete functions', () => {
        it('should return limited nr of results (5) for first item in array', (done) => {
            const gateChanges = [gateChange1, gateChange1, gateChange1, gateChange1, gateChange1, gateChange1, gateChange1]
            const gateChangesArr = [gateChange1, gateChange1, gateChange1, gateChange1, gateChange1, gateChange1, gateChange1]
            const gateChangesDep = [gateChange1, gateChange1, gateChange1, gateChange1, gateChange1, gateChange1, gateChange1]
            const changedGates = of([gateChanges, gateChangesArr, gateChangesDep])
            changedGates.pipe(
                tap(console.log),
                FlightsHelper.limitNumberOfResults$(),
                tap(console.log),
            ).subscribe(
                ([currentGateChanges, arr, dep]) => {
                    expect(currentGateChanges.length).toBe(5)
                    expect(arr.length).toBe(7)
                    expect(dep.length).toBe(7)
                    done()
                }
            );
        });

        it('should return limited nr of results (5) for first item in array simple', (done) => {
            const gateChanges = [gateChange1, gateChange1, gateChange1, gateChange1, gateChange1, gateChange1, gateChange1]
            const gateChangesArr = [gateChange1, gateChange1, gateChange1, gateChange1, gateChange1, gateChange1, gateChange1]
            const gateChangesDep = [gateChange1, gateChange1, gateChange1, gateChange1, gateChange1, gateChange1, gateChange1]
            const changedGates = of([gateChanges, gateChangesArr, gateChangesDep])
            changedGates.pipe(
                tap(console.log),
                FlightsHelper.limitNumberOfResultsSimple$(),
                tap(console.log),
            ).subscribe(
                ([currentGateChanges]) => {
                    expect(currentGateChanges.length).toBe(5)
                    done()
                }
            );
        });

        it('should limited nr of results to first (5) in supplied array ', () => {
            const gateChanges = [gateChange1, gateChange1, gateChange1, gateChange1, gateChange1, gateChange1, gateChange1]
            expect(FlightsHelper.limitNumberOfResults(gateChanges).length).toBe(5)
        });
    });
});
