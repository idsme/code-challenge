import {AutoCompleteHelper} from './auto-complete-helper'
import {of} from 'rxjs'
import {tap} from 'rxjs/operators'
import {FlightsHelper} from '../flights-helper'

describe('AutoCompleteHelper', () => {
    it('should create an instance', () => {
        expect(new AutoCompleteHelper()).toBeTruthy()
    })

    it('should not process the searchTerm as is shorter then 2', (done) => {
        const searchTerm = ''
        const searchTerm$ = of(searchTerm)
        searchTerm$.pipe(
            AutoCompleteHelper.skipIfLengthOfSearchTermIsShorterThen$(2)
        ).subscribe(
            (currentSearchTerm) => {
                // As searchTerm should not be processed
                expect(true).toBe(false)
            },
            (error) => {
                expect(true).toBe(false)
            },
            () => {
                done()
            }
        )
    })

    it('should be processed as searchTerm greater then 1', (done) => {
        const searchTerm = 'ab'
        const searchTerm$ = of(searchTerm)
        searchTerm$.pipe(
            AutoCompleteHelper.skipIfLengthOfSearchTermIsShorterThen$(2)
        ).subscribe(
            (currentSearchTerm) => {
                // As searchTerm should  be processed
                expect(currentSearchTerm.length).toBeGreaterThan(1)
            },
            (error) => {
                expect(true).toBe(false)
            },
            () => {
                done()
            }
        )
    })

})
