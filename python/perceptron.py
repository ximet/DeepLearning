from pylab import rand, plot, show, norm


class Perceptron:
    def __init__(self):
        self.weight = rand(2)
        self.learningRate = 0.1

    def updateWeights(self, x, iterError):
        self.weight[0] += self.learningRate * iterError * x[0]
        self.weight[1] += self.learningRate * iterError * x[1]
