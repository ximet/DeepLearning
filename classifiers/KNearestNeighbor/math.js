const getEuclideanDistance = (list) => {
    return Math.sqrt(list.reduce((x, y) => Math.pow(x - y, 2), 0))
};

module.exports = {
    getEuclideanDistance
};
