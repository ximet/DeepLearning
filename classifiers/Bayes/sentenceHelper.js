const splitSentence = (sentence) => {
    const regExpOnlySymbol = /[^(a-zA-Z0-9_)+\s]/g;
    const clearedSentence = sentence.replace(regExpOnlySymbol, ' ');

    return clearedSentence.split(/\s+/);
};

module.exports = {
    splitSentence
};
