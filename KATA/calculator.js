const roman2Arabic = require('./roman2Arabic');
const arabic2Roman = require('./arabic2Roman')
const checkIsRightNumbers = require('./checker')

function calculator(string) {
    const sign_index = string.search(/\+|\-|\/|\*/)
    const sign = string.slice(sign_index, sign_index + 1);
    const error = new Error('Некорректный ввод.')
    let operand1, operand2

    if (sign_index === -1) {
        throw error + ' ' + 'Нет знака препинания'
    }

    operand1 = string.slice(0, sign_index - 1)
    operand2 = string.slice(sign_index + 2)

    const typeOfOperand = checkIsRightNumbers(operand1, operand2)
    if (!typeOfOperand) {
        throw error + ' ' + 'Проверьте операнды'
    }

    if (typeOfOperand == 'roman') {
        operand1 = roman2Arabic(operand1)
        operand2 = roman2Arabic(operand2)
    }
    else {
        operand1 = Number(operand1)
        operand2 = Number(operand2)
    }

    let result
    switch (sign) {
        case "/":
            result = typeOfOperand === 'roman' ? arabic2Roman(Math.floor(operand1 / operand2)) : Math.floor(operand1 / operand2)
            break
        case "*":
            result = typeOfOperand === 'roman' ? arabic2Roman(operand1 * operand2) : operand1 * operand2
            break
        case "+":
            result = typeOfOperand === 'roman' ? arabic2Roman(operand1 + operand2) : operand1 + operand2
            break
        case "-":
            result = typeOfOperand === 'roman' ? arabic2Roman(operand1 - operand2) : operand1 - operand2
            break
    }

    return String(result);
}


module.exports = calculator; // Не трогайте эту строчку