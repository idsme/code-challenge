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

        // If we have not checked everything yet... continue.
        while (index + lengthOfSearchTerm <= line.length) {
            console.log('current input:>', line, index);

            // If match found..
            if (equalCharactersButDifferentCase(line.charAt(index), (line.charAt(index + 1)))) {
                const searchTerm = line.charAt(index) + line.charAt(index + 1);

                // replaceALl was not available... at start of challenge... but saves a loop.
                line = line.replaceAll(searchTerm, '');

                removedCharactersSoDoAgain = true;
                console.info('Go though string again as we just removed characters, remainig input:', line);
                break;
            } else {
                console.info('Match criteria not found next position. current position in input string:', index + 1);
            }

            index++;
        }
        // Make exit function
        // as input string gets smaller due to removals... else endless loop
        if ((index + lengthOfSearchTerm) >= line.length) {
            console.log('Outer Exit loop as length === 0 or we are end of string without removing something. Thus finished', line);
            removedCharactersSoDoAgain = false;
        } else {
            console.log('Outer Continue as we have not reached end of spring length available', line.length, index);
        }
    }
    return line;
};

export const equalCharactersButDifferentCase = (a: string, b: string): boolean => {

    let result = false;
    if (a !== b && a.toUpperCase() === b.toUpperCase()) {
        console.log('found a match:>', a, b);
        result = true;
    } else {
        console.log('Not matching found', a, b);
    }

    return result;
};
