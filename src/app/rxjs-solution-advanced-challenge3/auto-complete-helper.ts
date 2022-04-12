import {debounceTime, map, skipWhile} from 'rxjs/operators'
import {SearchResult} from '../../../api/gate-changes'
import {FlightsHelper} from '../flights-helper'

export class AutoCompleteHelper {
    // TODO IDSME testing this out..to see how easily this is testable.
    // public static limitNumberOfResultsSimple$<T extends unknown[], R>(sizeLimit = 5): R {
    //     return map<T, R>((items) => items.splice(0, sizeLimit))
    // }

    public static limitNumberOfResults$(sizeLimit = 5) {
        return map(([gateChanges, resultDataArrivals, resultDataDepartures]) => [AutoCompleteHelper.limitNumberOfResults(gateChanges), resultDataArrivals, resultDataDepartures])
    }

    public static limitNumberOfResults(items: any[], sizeLimit = 5) {
        return items.splice(0, sizeLimit)
    }

    public static mapValueToUpperCase$() {
        return map((data: string) => data.toUpperCase())
    }

    public static extractValueFromInput$() {
        return map((e: any) => e.target.value)
    }

    public static skipIfLengthOfSearchTermIsShorterThen$(length: number = 1) {
        return skipWhile((data: string) => data.length < length)
    }

    public static waitForUserToStopTypingForXMilliseconds$(waitInMilliseconds = 200) {
        return debounceTime(waitInMilliseconds);
    }



}
