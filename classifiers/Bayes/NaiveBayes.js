const { splitSentence, getNumberOfOccurrencesDictionary } = require('./sentenceHelper.js');

class NaiveBayes {
    constructor (options) {
        this.options = options ? options : this.getError('option');
        this.groupSize = 0;
        this.listCategory = [];
        this.vocabulary = [];
        this.vocabularySize = 0;
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
        this.initializeCategory(category);

        const words = splitSentence(sentence);
        const occurencyDictionary = getNumberOfOccurrencesDictionary(words);

        Object.keys(occurencyDictionary).forEach(item => {

            if (!this.vocabulary.find(word => word === item)) {
                this.vocabulary.push(item);
                this.vocabularySize++;
            }

        });



        console.log('category:', this.listCategory)
    }

    additiveSmoothing (frequencyCount, itemCount) {
        return ( frequencyCount + 1 ) / ( itemCount + this.groupSize )
    }
}

module.exports = NaiveBayes;
