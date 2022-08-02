console.log('iniciado')

document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');

    const input = document.querySelector('input');
    input.addEventListener('input', formulaWriting);
    input.focus()

    function checkCursorPosition(event) {
        // FASE 1: ver si agrega suma()
        // La posición en el campo de texto en que se está
        if (event.inputType === 'deleteContentForward' || event.inputType === 'deleteContentBackward') {
            return;
        };

        const cursorPosition = event.target.selectionStart
        const textMatch = 'suma(';
        if (cursorPosition < textMatch.length) {
            return;
        };

        // El valor del input text
        const value = event.target.value;
        const lastText = value.slice(cursorPosition - textMatch.length, cursorPosition);

        if (lastText === textMatch) {
            // console.log('estas dentro del primer parentesis de ', textMatch);
            // habilitar uso de parentesis y mostrar conectores

            if (value.length == cursorPosition || value[cursorPosition] != ')') {
                input.value += ')';
                input.setSelectionRange(cursorPosition, cursorPosition);
                return;
            };
        };
    }


    function formulaWriting(event) {
        checkCursorPosition(event)
        const value = event.target.value;

        // Devuelve true si el input contiene algun suma() inválido con la nonmenclatura indicada
        const regexValueValidator = /'conector','columna',[1-9][0-9]*,'tiempo'/;
        const hasInvalidSuma = checkSumas(value, regexValueValidator);
        if (hasInvalidSuma) {
            console.log('alguna declaración de suma es inválida')
            event.target.style.borderColor = 'red'
        } else {
            event.target.style.borderColor = 'black'
        }

        // /g = buscar todas las coincidencias
        // /s = espacio linea en blanco, etc
        // \b empieza con
        // ? puede estar o no
        // * puede estar 0 o más veces
        // + puede estar 1 o más veces

        // re = /\s*(\bsuma\().*\)\s*$/g
        // console.log(this.measuresList, this.columnsList)
        // const pattern = /^'(\bconector)','columna',[1-9][0-9]*,'tiempo'$/;
        // const connectorsNames = Array.from(this.measuresList, connector => connector.name).join('|');
        // const regexPattern = new RegExp(pattern.toString().substr(1).slice(0, -1).replace('conector', connectorsNames));
        // console.log(regexPattern)

        // console.log({ value: value, pattern: pattern, valid: pattern.test(value)});
        // 'suma()'
    }

    function checkSumas(value, validator) {
        // re = /\s*(\bsuma\()'conector','columna',[1-9][0-9]*,'tiempo'\)\s*$/g
        const re = /(suma\(.*?\))+/g;

        // Obtenemos todos los casos de coincidencia, es decir todos los suma(*)
        const matches = value.match(re);
        const matchesLength = matches && matches.length;

        // No hay sumas
        if (!matchesLength) {
            return false
        }

        // Existen coincidencias? existen suma(*) en el input?
        // const valueMatch = /\(([^)]+)\)/;
        const regexValueValidator = validator;

        // Iteramos todas las coincidencia y buscamos si alguna suma() no tiene la nomeclatura correspondiente
        const hasInvalidSuma = matches.some(match => {
            // const parenthesisValue = match.match(valueMatch)

            const parenthesisValue = match.match(regexValueValidator)
            console.log(parenthesisValue)

            // No hay nada dentro del parentesis de suma()
            if (!parenthesisValue) {
                return true
            }

            return false;
            
            // if (parenthesisValue) {
            //     const valuesSplitted = parenthesisValue[0].split(',')
            //     valuesSplitted.forEach(element => {
            //         console.log(element)
            //     });
            // }
        })

        return hasInvalidSuma
    }
});

