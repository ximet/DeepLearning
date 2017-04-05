const updateFrequencyCountDictionary = (item, frequencyItemInText, category, dictionary) =>{
    if (!dictionary[category][item]) {
        dictionary[category][item] = frequencyItemInText
    }
    else {
        dictionary[category][item] += frequencyItemInText
    }

    return dictionary;
};

const additiveSmoothing = (frequencyCount, itemCount, groupSize) => {
    return ( frequencyCount + 1 ) / ( itemCount + groupSize )
};

module.exports = {
    updateFrequencyCountDictionary, additiveSmoothing
};
