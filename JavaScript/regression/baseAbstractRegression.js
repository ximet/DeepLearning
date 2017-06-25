export default class BaseAbstractRegression {
    constructor() {
        if (new.target === BaseAbstractRegression) {
            throw new Error('BaseAbstractRegression must be subclassed');
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
