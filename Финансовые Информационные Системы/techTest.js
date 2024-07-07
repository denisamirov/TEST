// Есть упорядоченная последовательность чисел от 1 до N с шагом 1
// Из нее удалили одно число, а оставшиеся перемешали
// Нужно написать функцию, которая по итоговому массиву находит удаленное число


const task = (arr) => {
    const arr1 = arr.sort((a, b) => a - b)

    if (arr[0] != 1) {
        return 1
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i + 1] - arr1[i]!= 1) {
            return arr1[i] + 1
        }
    }

}

console.log(task([1,3,2,5,4,7]))
console.log(task([3,2,4]))
console.log(task([5,2,3,1]))
