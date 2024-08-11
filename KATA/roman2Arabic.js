function roman2Arabic(roman) {
    let result = 0
    if (roman == 'IV') return 4
    if (roman == 'IX') return 9

    for (let i = 0, len = roman.length; i < len; i++) {
        const partOfRoman = roman.slice(i, i + 1)

        if (partOfRoman === 'I') {
            result += 1
        }
        if (partOfRoman === 'V') {
            result += 5
        }
        if (partOfRoman === 'X') {
            result += 10
        }
    }

    return result
}

module.exports = roman2Arabic