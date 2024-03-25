const list = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));

const simpleNumber = (array) => {

    const numb = array.map((item) => {
        if (!((item**0.5)%1 === 0) && !(item%2 === 0) 
        && !(item%3 === 0) && !(item%5 === 0) && !(item%7 === 0) || (item === 1)) {
            return item
        }
    })
    
    const data = numb.filter((item) => item)
    return data
}

console.log("Список чисел", list);
console.log("Простые числа", simpleNumber(list))