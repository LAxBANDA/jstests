/**
 * Sort roman numbers by names and then númeric amount
 * @param {string[]} names 
 * @returns {string[]}
 */
function sortRoman(names) {
    // Write your code here
    return names.sort((a, b) => {
        const [nameA, romanNumberA] = a.split(" ");
        const [nameB, romanNumberB] = b.split(" ");

        const totalA = romanToNumber(romanNumberA);
        const totalB = romanToNumber(romanNumberB);

        if(nameA > nameB) {
            return 1;
        } else if(nameA < nameB) {
            return -1;
        };

        if(totalA > totalB) {
            return 1;
        } else if(totalA < totalB) {
            return -1;
        };

        return 0;
    })

}


function romanToNumber(romanNumber) {
    const romanNumberValues = {
        I: 1,
        V: 5,
        X: 10,
        L: 50
    };

    let total = romanNumberValues[romanNumber[0]];
    for (i = 1; i < romanNumber.length; i++) {
        const current = romanNumberValues[romanNumber[i]];
        const last = romanNumberValues[romanNumber[i - 1]] || 0;
        total = (last >= current) ? total + current : current + total - last * 2;
    }

    return total;
}

console.log(sortRoman([
    "Steven XL",
    "Steven XVI",
    "David IX",
    "Mary XV",
    "Mary XIII",
    "Mary XX",
    "Tony XLIX"
]))
