const { splitSentence, getNumberOfOccurrencesDictionary } = require('./sentenceHelper.js');

class NaiveBayes {
    constructor (options) {
        this.options = options ? options : this.getError('option');
        this.groupSize = 0;
        this.listCategory = [];

        this.totalDocument = 0;
    }



    getError (type) {
        switch(type) {
            case 'option':
                throw TypeError('Naive Bayes have invalid option');
        }

    }

    initializeCategory (category) {
        return this.listCategory.find(item => item === category) ? this.listCategory : this.listCategory.push(category);
    }

    learn (sentence, category) {
        this.totalDocument++;

        const words = splitSentence(sentence);
        getNumberOfOccurrencesDictionary(words);
    }

    additiveSmoothing (frequencyCount, itemCount) {
        return ( frequencyCount + 1 ) / ( itemCount + this.groupSize )
    }
}

module.exports = NaiveBayes;
