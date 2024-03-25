const numb1 = '9181232'
const numb2 = '484'
const numbNew = Array.from(numb1)
let numbNew2 = Array.from(numb2)

numbNew2.sort((a,b) => b -a)

for (let i=0; i<numbNew2.length; i++) { 
    for (let j=0; j<numbNew.length; j++) {
        if (numbNew2[i] > numbNew[j]) {
            numbNew[j] = numbNew2[i]
            break
        }
    }
}

console.log(numbNew.join(''))