const Perceptron = require('./perceptron/hiddenLayer/neuralNetwork.js');
const NaiveBayes = require('./classifiers/Bayes/NaiveBayes.js');

//test Perceptron
// const data = [
//     {input: [0, 0], output: 0},
//     {input: [1, 0], output: 1},
//     {input: [0, 1], output: 1},
//     {input: [1, 1], output: 0},
// ];
//
// const simplePerceptron = new Perceptron(data);
// simplePerceptron.networkTask('XOR');
// simplePerceptron.trainNetwork();
// simplePerceptron.run();


const classifier = new NaiveBayes({});

classifier.learn('You are see new device, which Apple', 'tech');
classifier.learn('I like many device: samsungS6, nexus, iPhone, Pixel!!', 'tech');

classifier.learn('Ohhh, it is great kitten!!', 'cat');
classifier.learn('Kitten, tiger, leopard', 'cat');


classifier.categorize('iPhone it is cool telephone.');
