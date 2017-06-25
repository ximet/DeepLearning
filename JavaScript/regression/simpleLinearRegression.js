import BaseAbstractRegression from './baseAbstractRegression.js';

export default class SimpleLinearRegression extends BaseAbstractRegression {
    constructor(x, y) {
        super();
    }

    toJSON() {
        return {
            name: 'simpleLinearRegression'
        };
    }

    _predict(x) {

    }

    computeX(y) {
        
    }

    toString(precision) {

    }

    static load(json) {
        if (json.name !== 'simpleLinearRegression') {
            throw new TypeError('not a SLR model');
        }
        return new SimpleLinearRegression(true, json);
    }
}
