class NaiveBayes {
    constructor (options) {
        this.options = options ? options : this.error('option')
    }

    error (type) {
        switch(type) {
            case 'option':
                throw TypeError('Naive Bayes have invalid option');
        }

    }
}

module.exports = NaiveBayes;
