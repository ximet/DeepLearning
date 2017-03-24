const Perceptron = require('./perceptron/hiddenLayer/neuralNetwork.js');

const data = [
    {input: [0, 0], output: 0},
    {input: [1, 0], output: 1},
    {input: [0, 1], output: 1},
    {input: [1, 1], output: 0},
];

const simplePerceptron = new Perceptron(data);
simplePerceptron.trainNetwork();
simplePerceptron.run();
