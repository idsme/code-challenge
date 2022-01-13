

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

export const removeOppositeChars = (line: string): string => {

    let removedCharactersSoDoAgain = true;

    // exit when nothing is removed anymore.
    while (removedCharactersSoDoAgain === true) {
        let index = 0;
        const lengthOfSearchTerm = 2;

        // If we have not checked complete line ... continue shifting position to end of line.
        while (index + lengthOfSearchTerm <= line.length) {

            if (equalCharactersButDifferentCase(line.charAt(index), (line.charAt(index + 1)))) {
                const searchTerm = line.charAt(index) + line.charAt(index + 1);

                // replaceALl was not available... at start of challenge... but saves a loop.
                line = line.replaceAll(searchTerm, '');

                removedCharactersSoDoAgain = true;
                index = 0;
                break;
            }

            index++;
        }
        removedCharactersSoDoAgain = checkExitCriteria(index, lengthOfSearchTerm, line.length );
    }
    return line;
};

export const equalCharactersButDifferentCase = (a: string, b: string): boolean => {

    let result = false;
    if (a !== b && a.toUpperCase() === b.toUpperCase()) {
        result = true;
    }

    return result;
};

export const checkExitCriteria = (index: number, lengthOfSearchTerm: number, lengthOfInput: number): boolean => {
    let removedCharactersSoDoAgain = true;
    if ((index + lengthOfSearchTerm) > lengthOfInput) {
        removedCharactersSoDoAgain = false;
    }
    return removedCharactersSoDoAgain;
};
