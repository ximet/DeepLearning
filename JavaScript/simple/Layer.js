var math = require('./math.js')
var neuran = require('./Neuron.js')

class Layer {
  constructor(numNeurons, numInputs) {
    this.neurons = new Array(numNeurons)

    for (var i = 0; i < this.neurons.length; i++) {
      this.neurons[i] = new neuran.Neuron(numInputs)
    }
  }

  process (inputs) {
    return this.neurons.map(function(neuron) {
      return neuron.process(inputs)
    })
  }
}

exports.Layer = Layer;
