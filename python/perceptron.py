from pylab import rand, plot, show, norm
from math import exp


def functionActivation(x):
    return 1 / (1 + exp(-x))

#
#                       input1
#                                       F. activation
#                      0000
#                      0  0---------|   0000000
#                      0000         |   0     0
#                                   |   0     0   00000
#                                   |---0  S  0---0 0 0
#                       0000        |   0     0   00000
#                       0  0--------|   0000000
#                       0000                       output
#
#                    input2
#

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

    def train(self, data):
        learned = False
        iteration = 0
        while not learned:
            globalError = 0.0
            for desire in data:
                actual = self.response(desire)
                if desire[2] != actual:
                    iterateError = desire[2] - actual
                    self.updateWeights(desire, iterateError)
                    globalError += abs(iterateError)
            iteration += 1
            if globalError == 0.0 or iteration >= 100:
                print('iterations', iteration)
                learned = True