var math = require('./math.js')
var layerClass = require('./Layer.js')

class Network {
  constructor() {
    this.layers = []

    // Stop training when mean squared error of all output neurons reach this threshold
    this.errorThreshold = 0.00001

    // Number of iterations on each training
    this.trainingIterations = 500000

    // Rate at which the network learns in each iteration
    this.learningRate = 0.3
  }

  process (inputs) {
    var outputs
    this.layers.forEach(function(layer) {
      outputs = layer.process(inputs)
      inputs = outputs
    })
    return outputs
  }

  addLayer (numNeurons, numInputs) {
    if (numInputs == null) {
      var previousLayer = this.layers[this.layers.length - 1]
      numInputs = previousLayer.neurons.length
    }

    var layer = new layerClass.Layer(numNeurons, numInputs)
    this.layers.push(layer)
  }

  train (examples) {
    var outputLayer = this.layers[this.layers.length - 1]

    for (var it = 0; it < this.trainingIterations; it++) {

      for (var e = 0; e < examples.length; e++) {
        var inputs = examples[e][0]
        var targets = examples[e][1]

        var outputs = this.process(inputs)

        for (var i = 0; i < outputLayer.neurons.length; i++) {
          var neuron = outputLayer.neurons[i]

          neuron.error = targets[i] - outputs[i]

          // Keep track of the error of each examples to determine when to stop training.
          neuron.errors = neuron.errors || []
          neuron.errors[e] = neuron.error

          neuron.delta = neuron.lastOutput * (1 - neuron.lastOutput) * neuron.error
        }

        for (var l = this.layers.length - 2; l >= 0; l--) {
          for (var j = 0; j < this.layers[l].neurons.length; j++) {
            var neuronJ = this.layers[l].neurons[j]

            neuronJ.error = math.sum(this.layers[l + 1].neurons.
                                     map(function(n) { return n.weights[j] * n.delta }))
            neuronJ.delta = neuronJ.lastOutput * (1 - neuronJ.lastOutput) * neuronJ.error

            for (var i = 0; i < this.layers[l + 1].neurons.length; i++) {
              var neuronI = this.layers[l + 1].neurons[i]

              for (var w = 0; w < neuronI.weights.length; w++) {
                neuronI.weights[w] += this.learningRate * neuronI.lastInputs[w] * neuronI.delta
              }
              neuronI.bias += this.learningRate * neuronI.delta
            }
          }
        }
      }

      // Compute the mean squared error for all examples.
      var error = math.mse(outputLayer.neurons.
                           reduce(function(errors, n) { return errors.concat(n.errors) }, []))

      if (it % 10000 === 0) {
        console.log({ iteration: it, mse: error })
      }

      if (error <= this.errorThreshold) {
        return
      }

    }

  }
}

exports.Network = Network;
