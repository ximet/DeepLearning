const { splitSentence, getNumberOfOccurrencesDictionary } = require('./sentenceHelper.js');

class NaiveBayes {
    constructor (options) {
        this.options = options ? options : this.getError('option');
        this.groupSize = 0;
        this.listCategory = [];
        this.vocabulary = [];
        this.vocabularySize = 0;
        this.totalDocument = 0;
        this.frequencyCountDictionary = {};
        this.wordInCategory = {};
    }

    getError (type) {
        switch(type) {
            case 'option':
                throw TypeError('Naive Bayes have invalid option');
        }

    }

    initializeCategory (category) {
        this.frequencyCountDictionary[category] = {};
        this.wordInCategory[category] = 0;
        return this.listCategory.find(item => item === category) ? this.listCategory : this.listCategory.push(category);
    }

    learn (sentence, category) {
        this.totalDocument++;
        this.initializeCategory(category);

        const words = splitSentence(sentence);
        var occurencyDictionary = getNumberOfOccurrencesDictionary(words);

        Object.keys(occurencyDictionary).forEach(item => {

            if (!this.vocabulary.find(word => word === item)) {
                this.vocabulary.push(item);
                this.vocabularySize++;
            }
            const frequencyInText = occurencyDictionary[item];

            if (!this.frequencyCountDictionary[category][item]) {
              this.frequencyCountDictionary[category][item] = frequencyInText
            }
            else {
              this.frequencyCountDictionary[category][item] += frequencyInText
            }

            this.wordInCategory[category] += frequencyInText
        });
    }

    additiveSmoothing (frequencyCount, itemCount) {
        return ( frequencyCount + 1 ) / ( itemCount + this.groupSize )
    }
}

module.exports = NaiveBayes;
