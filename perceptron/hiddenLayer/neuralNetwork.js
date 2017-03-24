const { mean, callFunctionSomeTimes } = require('../../math.js');
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
    constructor(data, countIterateLearning) {
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
        };
        this.countIterateLearning = countIterateLearning || 100000;
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
        weight_deltas.hidden1_output += h1 * o1_delta;
        weight_deltas.hidden2_output += h2 * o1_delta;
        weight_deltas.bias_output += o1_delta;

        return weight_deltas;
    }

    train () {
        let weight_deltas = {
            input1_hidden1: 0,
            input2_hidden1: 0,
            bias_hidden1: 0,
            input1_hidden2: 0,
            input2_hidden2: 0,
            bias_hidden2: 0,
            hidden1_output: 0,
            hidden2_output: 0,
            bias_output: 0,
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

            weight_deltas.input1_hidden1 += input1 * hidden1_delta;
            weight_deltas.input2_hidden1 += input2 * hidden1_delta;
            weight_deltas.bias_hidden1 += hidden1_delta;

            weight_deltas.input1_hidden2 += input1 * hidden2_delta;
            weight_deltas.input2_hidden2 += input2 * hidden2_delta;
            weight_deltas.bias_hidden2 += hidden2_delta;
        }

        return weight_deltas;
    }

    calculateResults () {
        mean(this.data.map(({input: [i1, i2], output: y}) => {
            const output = this.neuralNetworkDescription(i1, i2).outputNN;

            return Math.pow(y - output, 2)
        }));
    }

    outputResults () {
        this.data.forEach(({input: [i1, i2], output: y}) =>
            console.log(`${i1} XOR ${i2} => ${this.neuralNetworkDescription(i1, i2).outputNN} (expected ${y})`));
    }

    trainedNeuralNetwork (weight_deltas = this.train()) {
        Object.keys(this.weights).forEach(key =>
            this.weights[key] += weight_deltas[key]);
    }

    trainNetwork () {
        callFunctionSomeTimes(() => this.trainedNeuralNetwork(), this.countIterateLearning);
    }

    run () {
        this.outputResults();
        this.calculateResults();
    }


}

module.exports = Perceptron;
