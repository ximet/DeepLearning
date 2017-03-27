const { splitSentence } = require('./sentenceHelper.js');

class NaiveBayes {
    constructor (options) {
        this.options = options ? options : this.getError('option');
        this.groupSize = 0;

        this.totalDocument = 0;
    }



    getError (type) {
        switch(type) {
            case 'option':
                throw TypeError('Naive Bayes have invalid option');
        }

    }

    initializeCategory (category) {

    }

    learn (sentence, category) {
        this.totalDocument++;

        const words = splitSentence(sentence);
    }

    additiveSmoothing (frequencyCount, itemCount) {
        return ( frequencyCount + 1 ) / ( itemCount + this.groupSize )
    }
}

module.exports = NaiveBayes;
