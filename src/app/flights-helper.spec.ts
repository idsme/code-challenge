import {FlightsHelper} from './flights-helper';
import {SearchResult} from '../../api/gate-changes';

describe('FlightsHelper', () => {
    const arrivalFlightA = {arrivalTime: '2019-01-01T00:00:00.000Z'} as SearchResult;
    const arrivalFlightB = {arrivalTime: '2019-10-01T00:00:00.000Z'} as SearchResult;

    const departureFlightA = {departureTime: '2019-02-01T00:00:00.000Z'} as SearchResult;
    const departureFlightB = {departureTime: '2019-11-01T00:00:00.000Z'} as SearchResult;

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
});
