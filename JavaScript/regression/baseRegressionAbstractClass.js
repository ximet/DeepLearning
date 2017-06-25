export default class BaseRegression {
    constructor() {
        if (new.target === BaseRegression) {
            throw new Error('BaseRegression must be subclassed');
        }
    }

    _predict() {
        throw new Error('_predict must be implemented');
    }

    train() {
        throw new Error('train must be implemented');
    }

    toString() {
        return '';
    }
}
