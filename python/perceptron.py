from pylab import rand, plot, show, norm
from math import exp


def functionActivation(x):
    return 1 / (1 + exp(-x))


class Perceptron:
    def __init__(self):
        self.weight = rand(2)
        self.learningRate = 0.1

    def updateWeights(self, x, iterError):
        self.weight[0] += self.learningRate * iterError * x[0]
        self.weight[1] += self.learningRate * iterError * x[1]

    def response(self, x):
        y = x[0] * self.weight[0] + x[1] * self.weight[1]
        return functionActivation(y)
