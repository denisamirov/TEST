function checkIsRightNumbers(operand1, operand2) {
    const romanList = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X']
    if (+operand1 > 10 || +operand2 > 10) {
        return false
    }
    else if (Number.isInteger(+operand1) && Number.isInteger(+operand2) && +operand1 > 0 && +operand2 > 0) {
        return 'arabic'
    }
    else if (romanList.includes(operand1) && romanList.includes(operand2)) {
        return 'roman'
    }
    else {
        return false
    }
}

module.exports = checkIsRightNumbers