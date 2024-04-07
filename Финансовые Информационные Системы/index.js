class Annuitent {
    constructor(sum, rate, period) {
        this.summ = sum;                            // Сумма кредита
        this.rate = rate / 100;                     // Ставка в процентах / 100
        this.period = period;                       //Срок кредита в месяцах
        this.monthRate = this.rate / 12;            //процентная ставка в месяц, равная годовой ставке, поделённой на 12
        this.countDayYear = 365                     //Количество дней в году
        this.persentDay = this.countDayYear / 12      //Количество дней, за которые начисляются проценты
    }

    // Ежемесячный платеж
    getMonthPay() {
        const monthPayK = (this.monthRate * ((1 + this.monthRate) ** this.period)) / (((1 + this.monthRate) ** this.period) - 1)
        const monthPay = monthPayK * this.summ
        return monthPay
    }


    //Окргуляет до двух знаков после запятой
    roundup(numb) {
        return Math.round(numb * 100) / 100
    }


    //Сумма переплаты
    getbankPay(monthPay) {
        return (monthPay * this.period) - this.summ
    }

    //Долг по процентам
    getPersentSumm(summ) {
        return this.roundup(summ * (this.persentDay * this.rate / this.countDayYear))
    }


    //Расчёт аннуитетного платежа
    calculate() {
        const monthPay = this.roundup(this.getMonthPay())
        let year = 1
        let summ = this.summ
        console.log('Месяц\tЕжемесячный платеж\tОсновной долг\tДолг по процентам\tОстаток основного долга')
        let start = true
        let mainPay;
        let su = 0;
        while (summ > 0) {
            if (start) {
                mainPay = this.roundup(monthPay - this.getPersentSumm(summ))
                console.log(year, '\t', monthPay, '\t\t', mainPay, '\t', this.getPersentSumm(summ), '\t\t', summ - mainPay)
            }

            else {
                mainPay = this.roundup(monthPay - this.getPersentSumm(su))
                console.log(year, '\t', monthPay, '\t\t', mainPay, '\t', this.getPersentSumm(su), '\t\t', su - mainPay)
            }
            su = summ - mainPay
            year += 1
            summ -= mainPay
            start = false
        }

    }
}


let summ1 = 100000;     // Пример 1. Сумма кредита
const rate1 = 13        // Пример 1. Ставка в процентах
const period1 = 12      // Пример 1. Срок кредита в месяц

const example1 = new Annuitent(summ1, rate1, period1)
console.log(example1.calculate())


let summ2 = 350000;     // Пример 2. Сумма кредита
const rate2 = 12        // Пример 2. Ставка в процентах
const period2 = 24      // Пример 2. Срок кредита в месяц

const example2 = new Annuitent(summ2, rate2, period2)
console.log(example2.calculate())