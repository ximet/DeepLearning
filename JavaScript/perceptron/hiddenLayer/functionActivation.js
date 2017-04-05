const activationSigmoid = x => 1 / (1 + Math.exp(-x));

const derivativeSigmoid = x => {
    const fx = activationSigmoid(x);

    return fx * (1 - fx);
};

module.exports = {
    activationSigmoid, derivativeSigmoid
};
