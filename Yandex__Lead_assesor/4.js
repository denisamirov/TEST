
const findNivena = (numb) => {
    const list = String(numb).split('').map(i => Number(i))
    let sum = 0;

    for (i of list) {
        sum += i
    }

    if (+(numb) % sum == 0 && +(numb) > 0) {
        return numb
    }
    else {
        return 0
    }
}


const listHarsh = (n, k) => {
    let list = []

    while (list.length < n) {
        if (findNivena(k)) {
            list.push(k)
        }
        k += 1
    }

    return list

}


//Тест №1
console.log(listHarsh('13', -20))
//Тест №2
console.log(listHarsh(13, 100))

