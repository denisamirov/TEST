// Метод двух указателей
// Итоговая сложность O(n) - проход по элементу один раз

function findTwoElements(array, result) {
    let j = 0;
    let i = array.length - 1
    while (i > j) {
        summ = array[j] + array[i];
        if (summ < result) {
            j = j + 1
        }
        else if (summ > result) {
            i -= 1;
        }
        else { 
            return [array[j], array[i]]
        }
    }

    return 'Нет соответствия'
}

console.log(findTwoElements([0, 1, 5, 6], 8))