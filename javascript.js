const display = document.getElementById('display');
const numbers = document.getElementsByClassName('number');
const operator = document.getElementsByClassName('operator');
const clear = document.getElementById('clear');
const equals = document.getElementById('equals');
let firstOperand = '';
let secondOperand = '';
let operatorSign = '';
let fullDisplay = false;

function sum(x, y) {
    console.log(`${x} + ${y} = ${parseFloat(x) + parseFloat(y)}`)
    console.log(typeof (x + y));
    return (parseFloat(x) + parseFloat(y));
}

function diff(x, y) {
    console.log(`${x} - ${y} = ${x - y}`)
    console.log(typeof (x - y));
    return (x - y);
}

function prod(x, y) {
    console.log(`${x} * ${y} = ${x * y}`)
    return x * y;
}

function quot(x, y) {
    if (y == 0) {
        return "ERROR";
    } else {
        console.log(`${x} / ${y} = ${x / y}`)
        return x / y;
    }
}

function expo(x, y) {
    return x ** y;
}

function operation(num1, num2, operand) {
    switch (operand) {
        case '+':
            return sum(num1, num2);
            break;
        case '-':
            return diff(num1, num2);
            break;
        case '*':
            return prod(num1, num2);
            break;
        case '/':
            return quot(num1, num2);
            break;
        case 'x^y':
            return expo(num1, num2);
            break;
        default:
            return 'ERROR';
    }


}

function clearDisplay() {
    fullDisplay = false;
    display.innerText = '';
    firstOperand = '';
    secondOperand = '';
}

function addToDisplay(num) {
    display.innerText += num;
    console.log(num);
}

for (let i = 0; i < operator.length; i++) {
    operator[i].onclick = function () {
        fullDisplay = false;
        operatorSign = operator[i].innerText;
        firstOperand = display.innerText;
        display.innerText = '';
    }
}

for (let i = 0; i < numbers.length; i++) {
    numbers[i].onclick = function () {
        if (fullDisplay == true) {
            clearDisplay();
            fullDisplay = false;
        }
        addToDisplay(numbers[i].innerText)
    };
}

clear.onclick = clearDisplay;

equals.onclick = function () {
    secondOperand = display.innerText;
    console.log(firstOperand);
    display.innerText = operation(firstOperand, secondOperand, operatorSign);
    fullDisplay = true;
    firstOperand = display.innerText;
}