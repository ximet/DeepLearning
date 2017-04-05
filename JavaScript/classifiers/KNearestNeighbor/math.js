const getEuclideanDistance = (list) => {
    return Math.sqrt(list.reduce((prev, current) => prev + Math.pow(current.x - current.y, 2), 0))
};

module.exports = {
    getEuclideanDistance
};
