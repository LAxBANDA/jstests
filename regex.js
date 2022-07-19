import RandExp from 'randexp';
import variables from './variables.json'

const variablesKeys = Array.from(variables, variable => variable.key)
const variablesMatchedCases = variablesKeys.join('|');

// dos formas aceptables
//1. <a>
//2. a
// const re = /((<>)|)*?$/;
const defaultPattern = /^[a-zA-Z]:[\/\\]{1,2}((<\b(replaceString)>|[^\\\/:*?"<>|\|.])([\/\\]{1,2})*?)*?$/;
// [^\\\/:*?"<>|][\/\\]{1,2}
const regexPattern = new RegExp(defaultPattern.toString().substr(1).slice(0, -1).replace('replaceString', variablesMatchedCases))

console.log({ regexPattern, defaultPattern })

// Examples: C: || c: || D: || d:
const diskValidation = /[a-zA-Z]:/;

// Examples: / ó \ ó // ó \\
const slashValidator = /[\/\\]{1,2}/;

// Cualquier texto que no contega los caracteres:
// Caracteres no permitidos: / \ : * ? " < > |
const normalFolderValidation = /[^\\\/:*?"<>|]/;

// Cualquiera de los valores separados por |
const variableFolderValidation = /<[a|b]>/;
console.log({ diskValidation, normalFolderValidation, variableFolderValidation })

/**
 * Función para generar los paths de discos "x:/", "x:\", "x://", "x:\\"
 * @returns {Array<string>} lista de los posibles discos
 */
function generateDiskPaths() {
    let alphabet = "abcdefghijklmnñopqrstuvwxyz"
    alphabet += alphabet.toUpperCase();
    let paths = [];
    let randompaths = [];
    for(let i = 0; i < 5; i++){
        const randexp = new RandExp(/[^\\\/:*?"<>|\|.]{12}/).gen()
        randompaths.push(randexp)
    }
    for(let i = 0; i < alphabet.length; i++){
        const diskLetter = alphabet[i];
        const diskPaths = [`${diskLetter}:/`, `${diskLetter}://`, `${diskLetter}:\\`, `${diskLetter}:\\\\`];
        paths = [...paths, ...diskPaths]

        for(let d = 0; d < diskPaths.length; d++){
            variables.forEach(variable => {
                paths.push(`${diskPaths[d]}<${variable.key}>`)
                paths.push(`${diskPaths[d]}<${variable.key}><${variable.key}>`)
                
                randompaths.forEach(rp => {
                    paths.push(`${paths[paths.length - 1]}/${rp}`)
                    paths.push(`${paths[paths.length - 1]}/${rp}/<${variable.key}>`)
                })
            })
        }
    }

    // const reg = new RandExp(/^[a-zA-Z]:[\/\\]{1,2}((<\b(replaceString)>|[^\\\/:*?"<>|\|.])([\/\\]{1,2})*?)*?$/).gen()
    // paths.push(reg)

    return paths;
}


const paths = generateDiskPaths();

paths.forEach(item => {
    const test = item;

    const isValid = regexPattern.test(test);
    if(!isValid){
        console.log("\x1b[33m%s\x1b[0m", `${test}`, `es un directorio`, `${isValid ? '\x1b[38;2;0;255;0m' + 'válido' : '\x1b[38;2;255;0;0m' + 'inválido'}`)
    }
})