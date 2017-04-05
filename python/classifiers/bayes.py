import re


def splitSentence(sentence):
    return re.sub(str(["^(a-zA-Z0-9_)+\s"]), "", sentence)

