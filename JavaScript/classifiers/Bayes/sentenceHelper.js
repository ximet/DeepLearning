const splitSentence = (sentence) => {
    const regExpOnlySymbol = /[^(a-zA-Z0-9_)+\s]/g;
    const clearedSentence = sentence.replace(regExpOnlySymbol, ' ');

    return clearedSentence.split(/\s+/);
};

const getNumberOfOccurrencesDictionary = (words) => {
    const numberOfOccurrencesDictionary = {};

    words.forEach(word => {
        if (!numberOfOccurrencesDictionary[word]) {
            numberOfOccurrencesDictionary[word] = 1;
        }
        else {
            numberOfOccurrencesDictionary[word]++;
        }
    });
    return numberOfOccurrencesDictionary;
};

module.exports = {
    splitSentence, getNumberOfOccurrencesDictionary
};
