const list = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));

const maxFullSquare = (array) => {
    array.sort((a, b) => b - a);
    const numb = array.find((item) => {
        if ((item**0.5)%1 === 0) {
            return item
        }
    })

    return numb
}

console.log("Список чисел", list);
console.log("Максимальный полный квадрат", maxFullSquare(list))