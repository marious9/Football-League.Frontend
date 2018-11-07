export const isSomethingExists = (baseArray, keyName) => {
    let counter = 0;
    let result = false;
    for(let i = 0; i < baseArray.length; i++){
        if(baseArray[i][keyName] !== ""){
            result = true;
            counter++;
        }
    }
    return {result: result, counter: counter};
}

export const mapArrayIntoObject = (array, arrayValueKey, keys, keysKeyName) => {
    let newObject = {};
    if(keys){
        for(let i = 0; i < array.length; i++)
            newObject[keys[i][keysKeyName]] = array[i][arrayValueKey];
    }
    
    return newObject;
}

export const contains = (array, element) => {
    for(let key in array)
        if(array[key].search(element) !== -1)
            return true;

    return false;
}
export const isSomethingEqual = (array, element) => {
    for(let key in array){
        if(array[key] === element)
            return true;
    }
    return false;
}