const sum = (list) => {
    const add = (a, b) => a + b;

    return list.reduce(add, 0);
};

const mean = (list) => {
    return sum(list) / list.length;
};

const callFunctionSomeTimes = (currentFunction, size) =>{
    let list = new Array(size);

    for (let i = 0; i < size; i++) {
        list[i] = currentFunction(i);
    }

    return list;
};

module.exports = {
    mean, callFunctionSomeTimes
};
