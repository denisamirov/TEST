// Метод двух указателей
function findModul(a, b) {
    let i = 0;
    let j = 0;
    const n = a.length;
    const m = b.length;
    let diff = Infinity;
    let result = [null, null]

    while (i < n && j < m) {
        newDiff = Math.abs(a[i] - b[j])
        if (diff > newDiff) {
            diff = newDiff
            result = [a[i], b[j]]
        }

        if (a[i] > b[j]) {
            j++;
        } else {
            i++;
        }
    }

    return result;
}

console.log(findModul([1, 2, 10], [6, 8, 20, 30]));
console.log(findModul([1, 4, 7, 10], [2, 5, 6, 13]));
console.log(findModul([98, 99, 100, 101], [1, 2, 3, 13]))