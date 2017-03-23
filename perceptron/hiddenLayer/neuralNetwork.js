const { mean } = require('../../math.js');
const { activationSigmoid, derivativeSigmoid} = require('./functionActivation.js');

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

        const outputNN = activationSigmoid(output_input);

        return {
            hidden1_input,
            hidden1,
            hidden2_input,
            hidden2,
            output_input,
            outputNN
        };
    }

    updateWeightForHiddenLayer (weight_deltas, h1, h2, o1_delta) {
        weight_deltas.h1_o1 += h1 * o1_delta;
        weight_deltas.h2_o1 += h2 * o1_delta;
        weight_deltas.bias_o1 += o1_delta;

        return weight_deltas;
    }

    train () {
        let weight_deltas = {
            i1_h1: 0,
            i2_h1: 0,
            bias_h1: 0,
            i1_h2: 0,
            i2_h2: 0,
            bias_h2: 0,
            h1_o1: 0,
            h2_o1: 0,
            bias_o1: 0,
        };

        for (let {input: [input1, input2], output} of this.data) {
            const { hidden1_input, hidden1, hidden2_input, hidden2, output_input, outputNN } = this.neuralNetworkDescription(input1, input2);

            //train
            const delta = output - outputNN;
            const output_delta = delta * derivativeSigmoid(output_input);

            //update weight
            weight_deltas = this.updateWeightForHiddenLayer(weight_deltas, hidden1, hidden2, output_delta);


            //update hidden layer
            const hidden1_delta = output_delta * derivativeSigmoid(hidden1_input);
            const hidden2_delta = output_delta * derivativeSigmoid(hidden2_input);

            weight_deltas.i1_h1 += input1 * hidden1_delta;
            weight_deltas.i2_h1 += input2 * hidden1_delta;
            weight_deltas.bias_h1 += hidden1_delta;

            weight_deltas.i1_h2 += input1 * hidden2_delta;
            weight_deltas.i2_h2 += input2 * hidden2_delta;
            weight_deltas.bias_h2 += hidden2_delta;
        }

        return weight_deltas;
    }

    calculateResults () {
        mean(this.data.map(({input: [i1, i2], output: y}) => Math.pow(y - this.neuralNetworkDescription(i1, i2), 2)));
    }

    outputResults () {
        this.data.forEach(({input: [i1, i2], output: y}) =>
            console.log(`${i1} XOR ${i2} => ${this.neuralNetworkDescription(i1, i2)} (expected ${y})`));
    }

    trainedNeuralNetwork (weight_deltas = this.train()) {
        Object.keys(this.weights).forEach(key =>
            this.weights[key] += weight_deltas[key]);
    }


}

module.exports = Perceptron;
