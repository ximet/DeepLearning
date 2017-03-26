class NaiveBayes {
    constructor (options) {
        this.options = options ? options : this.getError('option');
        this.groupSize = 0;
    }

    getError (type) {
        switch(type) {
            case 'option':
                throw TypeError('Naive Bayes have invalid option');
        }

    }

    additiveSmoothing (frequencyCount, itemCount) {
        return ( frequencyCount + 1 ) / ( itemCount + this.groupSize )
    }
}

module.exports = NaiveBayes;
