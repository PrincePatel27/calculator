let numberButtons = document.querySelectorAll(".btn-number");
let operationButtons = document.querySelectorAll(".btn-operation")
let allClearButton = document.querySelector(".btn-all-clear");
let deleteButton = document.querySelector(".btn-delete");
let equalButton = document.querySelector(".btn-equal");
let firstNumber = document.querySelector(".perviousnumber");
let secondNumber = document.querySelector(".cureentnumber");
const addition = (num1, num2) => {
    return num1 + num2;
};
const subract = (num1, num2) => {
    return num1 - num2;
};
const multiply = (num1, num2) => {
    return num1 * num2;
};
const divide = (num1, num2) => {
    return num1 / num2;
};
class Calculator {
    constructor(firstNumber, secondNumber) {
        this.firstNumber = firstNumber;
        this.secondNumber = secondNumber;
        this.clear();
    }
    clear() {
        this.currentNumber = "";
        this.perviousNumber = "";
        this.operation = undefined;
        this.updateDisplay();
    }
    delete() {
        this.currentNumber = this.currentNumber.toString().slice(0, -1);
        this.updateDisplay();
    }
    appendNumber(number) {
        if (number === "." && this.currentNumber.includes('.')) {
            return;
        }
        this.currentNumber = this.currentNumber.toString() + number.toString();
        this.updateDisplay();
    }
    chooseOperation(operation) {
        if (this.currentNumber === '') {
            return;
        }
        if (this.perviousNumber !== '') {
            this.operate();
        }
        this.operation = operation;
        this.perviousNumber = this.currentNumber;
        this.currentNumber = '';
        this.updateDisplay();
    }
    operate() {
        let number1 = parseFloat(this.perviousNumber);
        let number2 = parseFloat(this.currentNumber);
        let result;
        console.log(`number 1: ${number1} and number2: ${number2}`);
        if (isNaN(number1) || isNaN(number2)) {
            return;
        }
        else if (this.operation === "+") {
            result = addition(number1, number2);
        }
        else if (this.operation === "-") {
            result = subract(number1, number2);
        }
        else if (this.operation === "*") {
            result = multiply(number1, number2);
        }
        else {
            result = divide(number1, number2);
        }
        this.currentNumber = result;
        this.operation = undefined;
        this.perviousNumber = '';
        this.updateDisplay();
    }
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
            integerDisplay = '';
        }
        else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`;
        }
        else {
            return integerDisplay;
        }
    }
    updateDisplay() {
        this.secondNumber.innerText = this.getDisplayNumber(this.currentNumber);
        if (this.operation != null) {
            this.firstNumber.innerText = `${this.getDisplayNumber(this.perviousNumber)} ${this.operation}`;
        }
        else {
            this.firstNumber.innerText = "";
        }
    }
}
const calculator = new Calculator(firstNumber, secondNumber);

numberButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        console.log(e.target.innerText);
        calculator.appendNumber(button.innerText);
    });
});
operationButtons.forEach((button) => {
    button.addEventListener('click', (e) => {
        console.log(e.target.innerText);
        calculator.chooseOperation(button.innerText);
    });
});
equalButton.addEventListener('click', (e) => {
    calculator.operate();
});
allClearButton.addEventListener('click', (e) => {
    console.log(e.target.innerText);
    calculator.clear();
});
deleteButton.addEventListener('click', (e) => {
    calculator.delete();
});
document.addEventListener('keydown', function (event) {
    let numbers = /[0-9]/g;
    let operators = /[+\-*\/]/g;
    if (event.key.match(numbers)) {
        event.preventDefault();
        calculator.appendNumber(event.key);
    }
    if (event.key === '.') {
        event.preventDefault();
        calculator.appendNumber(event.key);
    }
    if (event.key.match(operators)) {
        event.preventDefault();
        calculator.chooseOperation(event.key);
    }
    if (event.key === 'Enter' || event.key === '=') {
        event.preventDefault();
        calculator.operate();
    }
    if (event.key === "Backspace") {
        event.preventDefault();
        calculator.delete();
    }
    if (event.key == 'Delete') {
        event.preventDefault();
        calculator.clear();
    }
});
