import {removeOppositeChars, equalCharactersButDifferentCase} from './challenge-1';


// Added test based on acceptance criteria specified.
// Started easy..  Build up func with each test case such that if you change something you know instantly where it is broken.
describe('Challenge 1 Tests', () => {

    describe('equalCharactersButDifferentCase', () => {
        test('solution aA => true ', () => {
            const result = equalCharactersButDifferentCase('a', 'A');
            expect(result).toBe(true);
        });

        test('solution AA => false ', () => {
            const result = equalCharactersButDifferentCase('A', 'A');
            expect(result).toBe(false);
        });

        test('solution aa => false ', () => {
            const result = equalCharactersButDifferentCase('a', 'a');
            expect(result).toBe(false);
        });
    });

// If equalCharactersButDifferentCase was complexer would mock method within this test.
    describe('removeOppositeChars', () => {

        test('solution aA => ""', () => {
            const result = removeOppositeChars('aA');
            expect(result).toBe('');
        });

        test('solution abAB => abAB', () => {
            const result = removeOppositeChars('abAB');
            expect(result).toBe('abAB');
        });

        test('solution aabAAB => aabAAB', () => {
            const result = removeOppositeChars('aabAAB');
            expect(result).toBe('aabAAB');
        });

        test('solution dabAcCaCBAcCcaDA => dabCBAcaDA', () => {
            const result = removeOppositeChars('dabAcCaCBAcCcaDA');
            expect(result).toBe('dabCBAcaDA');
        });

        // my own extra tests for edge cases
        test('solution baABc => c checks start over criteria', () => {
            const result = removeOppositeChars('baABc');
            expect(result).toBe('c');
        });

        test('solution cbaABc => "" checks start over criteria', () => {
            const result = removeOppositeChars('cbaABC');
            expect(result).toBe('');
        });

        // Test for question: What is the output for: VvbBfpPFrRyRrNpYyPDlLdVvNnMmnOCcosOoSoOfkKKkFJjyYjJWwHhnSstuBbdsSDqQUqQkKVvILlVvGgjJiVcCvvfBbvVoOGgFn ?
        test('challenge-1 solution is clean code and tdd above.. ;)', () => {
            const result = removeOppositeChars('VvbBfpPFrRyRrNpYyPDlLdVvNnMmnOCcosOoSoOfkKKkFJjyYjJWwHhnSstuBbdsSDqQUqQkKVvILlVvGgjJiVcCvvfBbvVoOGgFn');
            expect(result).toBe('yntvn');
        });
    });

});

/**
 * Challenge 1
 *
 * You start with a string consisting of uppercase and lowercase letters (example: dabAcCaCBAcCcaDA.)
 * We want you to write a function that takes a string and removes all characters that are followed by the same character of the
 * opposite case. The rules are:
 *
 * For input: "aA", a and A are of the opposite case, returning an empty string.
 * For input: "abBA", bB are of the opposite case, leaving aA. As above, this is also removed, returning an empty string as well.
 * For input: "abAB", no two adjacent characters are of the same type, so the same string is returned.
 * For input: "aabAAB", even though aa and AA are the same character, their cases match, and so nothing happens.
 * Now, consider a larger example, dabAcCaCBAcCcaDA:
 *
 *   - dabAcCaCBAcCcaDA  The first 'cC' is removed.
 *   - dabAaCBAcCcaDA    This creates 'Aa', which is removed.
 *   - dabCBAcCcaDA      Either 'cC' or 'Cc' are removed (the result is the same).
 *   - dabCBAcaDA        No further actions can be taken.
 *
 * What is the solution for: "VvbBfpPFrRyRrNpYyPDlLdVvNnMmnOCcosOoSoOfkKKkFJjyYjJWwHhnSstuBbdsSDqQUqQkKVvILlVvGgjJiVcCvvfBbvVoOGgFn"?
 */
