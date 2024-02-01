// Excercise for CoderByte
// Instrucciones: in console launch "node index.js"
const https = require('https');

https.get('https://coderbyte.com/api/challenges/json/wizard-list', (resp) => {
    resp.setEncoding('utf8');
    let dataResponse = ""
    resp.on('data', (data) => {
        dataResponse += data;
    })

    resp.on("end", () => {
        const parsedResponseData = JSON.parse(dataResponse);
        const orderedDataResponse = callback(parsedResponseData);
        console.log(JSON.stringify(orderedDataResponse))
    })
})

const callback = (dataResponse) => {

    const orderData = (valueKey) => {
        if (valueKey instanceof Array) {
            return [...orderArrayWithoutDuplicates(valueKey)];
        } else if (valueKey instanceof Object) {
            return orderObject(valueKey);
        }
        return valueKey;
    };

    const sortCallback = (a, b) => {
        const aLower = a.toLowerCase();
        const bLower = b.toLowerCase();
        if (aLower < bLower) {
            return -1;
        }
        if (aLower > bLower) {
            return 1;
        }
        return 0;
    };

    const orderObject = object => Object.keys(object).sort(sortCallback).reduce((obj, key) => {
        const value = orderData(object[key]);
        if (!checkValueIsEmpty(value)) {
            obj[key] = value
        }
        return obj;
    }, {});

    const checkValueIsEmpty = value => {
        return (value === '' || value === undefined || value === null || Array.isArray(value) && value.length === 0);
    }

    const orderArrayWithoutDuplicates = array => [...array.reduce((acc, item) => {
        const orderedData = orderData(item);
        (!checkValueIsEmpty(orderedData)) && acc.add(JSON.stringify(orderedData));

        return acc;
    }, new Set())].map(stringValue => JSON.parse(stringValue));

    const orderedDataResponse = orderData(dataResponse);
    return orderedDataResponse;
}