class KNearestNeighbor {
    constructor (options) {
        this.options = options ? options : this.getError('option');

    }

    getError (type) {
        switch(type) {
            case 'option':
                throw TypeError('k nearest neighbor classifier have invalid option');
        }

    }

    initializeNewCategory (category) {

    }

    initializeCategory (category) {

    }

    learn (sentence, category) {

    }

    categorize (sentence) {

    }

}

module.exports = KNearestNeighbor;
