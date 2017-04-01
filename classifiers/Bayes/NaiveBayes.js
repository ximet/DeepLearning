const { splitSentence, getNumberOfOccurrencesDictionary } = require('./sentenceHelper.js');
const { additiveSmoothing, updateFrequencyCountDictionary } = require('./math.js');

class NaiveBayes {
    constructor (options) {
        this.options = options ? options : this.getError('option');
        this.groupSize = 0;
        this.listCategory = [];
        this.vocabulary = [];
        this.vocabularySize = 0;
        this.totalSentences = 0;
        this.frequencyCountDictionary = {};
        this.wordInCategory = {};
        this.countSentenceInCategory = {};
    }

    getError (type) {
        switch(type) {
            case 'option':
                throw TypeError('Naive Bayes have invalid option');
        }

    }

    initializeCategory (category) {
        this.countSentenceInCategory[category] = 0;
        this.frequencyCountDictionary[category] = {};
        this.wordInCategory[category] = 0;
        return this.listCategory.find(item => item === category) ? this.listCategory : this.listCategory.push(category);
    }

    learn (sentence, category) {
        this.totalSentences++;
        this.initializeCategory(category);
        this.countSentenceInCategory[category]++;

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
        let chosenCategory = null;
        let maxProbability = -Infinity;
        const words = splitSentence(sentence);
        const occurrenceDictionary = getNumberOfOccurrencesDictionary(words);

        this.listCategory.forEach(category => {
            const categoryProbability = this.countSentenceInCategory[category] / this.totalSentences;
            let logarithmCategoryProbability = Math.log(categoryProbability);
            Object.keys(occurrenceDictionary).forEach(item => {
                const frequencyItemInText = occurrenceDictionary[item];
                const wordFrequencyCount = this.frequencyCountDictionary[category][item] || 0;
                const wordCount = this.wordInCategory[category];
                const itemProbability = additiveSmoothing(wordFrequencyCount, wordCount, this.groupSize);

                logarithmCategoryProbability += frequencyItemInText * Math.log(itemProbability)
            });
            if (logarithmCategoryProbability > maxProbability) {
                maxProbability = logarithmCategoryProbability;
                chosenCategory = category
            }
        });

        console.log('Chosen category: ', chosenCategory);

        return chosenCategory;
    }




}

module.exports = NaiveBayes;
