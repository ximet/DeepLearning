const { mean, callFunctionSomeTimes} = require('../../math.js');
const { activationSigmoid, derivativeSigmoid} = require('./functionActivation.js');

const data = [
    {input: [0, 0], output: 0},
    {input: [1, 0], output: 1},
    {input: [0, 1], output: 1},
    {input: [1, 1], output: 0},
];

/*
        input1        hidden1
                                       F. activation
        0000          0000
        0  0----------0  0---------|   0000000
        0000\    /----0000         |   0     0
             \  /                  |   0     0   00000
              \/                   |---0  S  0---0 0 0
        0000  /\       0000        |   0     0   00000
        0  0-/--\------0  0--------|   0000000
        0000/    \-----0000                       output

       input2          hidden2
 */


class Perceptron {
    constructor(data) {
        this.data = data;
        this.weights = {
            input1_hidden1: Math.random(),
            input2_hidden1: Math.random(),
            bias_hidden1: Math.random(),
            input1_hidden2: Math.random(),
            input2_hidden2: Math.random(),
            bias_hidden2: Math.random(),
            hidden1_output: Math.random(),
            hidden2_output: Math.random(),
            bias_output: Math.random(),
        }
    }

    neuralNetworkDescription (input1, input2) {
        const hidden1_input = this.weights.input1_hidden1 * input1 + this.weights.input2_hidden1 * input2 + this.weights.bias_hidden1;
        const hidden1 = activationSigmoid(hidden1_input);

        const hidden2_input = this.weights.input1_hidden2 * input1 + this.weights.input2_hidden2 * input2 + this.weights.bias_hidden2;
        const hidden2 = activationSigmoid(hidden2_input);

        const output_input = this.weights.hidden1_output * hidden1 + this.weights.hidden2_output * hidden2 + this.weights.bias_output;

        const output = activationSigmoid(output_input);

        return {
            hidden1_input,
            hidden1,
            hidden2_input,
            hidden2,
            output_input,
            output
        };
    }

    train () {

    }

    calculateResults () {
        mean(this.data.map(({input: [i1, i2], output: y}) => Math.pow(y - this.neuralNetworkDescription(i1, i2).output, 2)));
    }

    outputResults () {
        this.data.forEach(({input: [i1, i2], output: y}) =>
            console.log(`${i1} XOR ${i2} => ${this.neuralNetworkDescription(i1, i2).output} (expected ${y})`));
    }

}

