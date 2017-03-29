const { splitSentence, getNumberOfOccurrencesDictionary } = require('./sentenceHelper.js');
const { additiveSmoothing, updateFrequencyCountDictionary } = require('./math.js');

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
        const occurrenceDictionary = getNumberOfOccurrencesDictionary(words);

        Object.keys(occurrenceDictionary).forEach(item => {

            if (!this.vocabulary.find(word => word === item)) {
                this.vocabulary.push(item);
                this.vocabularySize++;
            }
            const frequencyItemInText = occurrenceDictionary[item];

            this.frequencyCountDictionary = updateFrequencyCountDictionary(item, frequencyItemInText, category, this.frequencyCountDictionary);
            this.wordInCategory[category] += frequencyItemInText
        });
    }

    categorize (sentence) {
        const words = splitSentence(sentence);
        const occurrenceDictionary = getNumberOfOccurrencesDictionary(words);

        this.listCategory.forEach(category => {
            
        })
    }




}

module.exports = NaiveBayes;
