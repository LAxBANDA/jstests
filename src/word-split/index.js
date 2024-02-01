// Excercise for CoderByte
// Instrucciones: in console launch "node index.js"
// What do?
// Function receive an array with two string values
// The first is the concated word 
// The second is an string with words separated by commas
function WordSplit(strArr) {
    const chars = strArr[0].split(""); // Dividir en do palabras
    const dWords = new Set(strArr[1].split(",")); // Palabras del diccionario
    console.log({ chars, dWords })

    let finalString = '';
    for (let index = 0; index < chars.length; index++) {
        const currentWord = strArr[0].slice(0, index + 1);
        const exists = dWords.has(currentWord);
        if (!exists) {
            continue;
        }

        const otherWord = strArr[0].slice(index + 1);
        const existsOtherWord = dWords.has(otherWord)
        if (existsOtherWord) {
            const reversedOtherWord = otherWord.split("").reverse().join("");
            const reversedWord = currentWord.split("").reverse().join("");
            finalString = `${reversedOtherWord},${reversedWord}:${code}`
            break;
        }
    }

    return finalString;
}

const sample = ["baseball", "a,all,b,ball,bas,base,cat,code,d,e,quit,z"];
const code = "liyo84agdf06"
const a = WordSplit(sample);
console.log(a)