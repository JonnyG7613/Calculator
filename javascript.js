const display = document.getElementById('display');
const numbers = document.getElementsByClassName('number');
const operator = document.getElementsByClassName('operator');
const clear = document.getElementById('clear');
const equals = document.getElementById('equals');
let firstOperand = '';
let secondOperand = '';
let operatorSign = '';
let fullDisplay = true;
let previousOperator = '';
let previousSecondOperand = '';
display.innerText = 0;
let recentEquation = false;

function quot(x, y) {
    if (y == 0) {
        return "ERROR";
    } else {
        return Math.round((x / y) * 1000) / 1000;
    }
}

function operation(num1, num2, operand) {
    switch (operand) {
        case '+':
            return Math.round((parseFloat(num1) + parseFloat(num2)) * 1000) / 1000;
            break;
        case '-':
            return Math.round((num1 - num2) * 1000) / 1000;
            break;
        case '*':
            return Math.round((num1 * num2) * 1000) / 1000;
            break;
        case '/':
            return quot(num1, num2);
            break;
        case 'x^y':
            return Math.round((num1 ** num2) * 1000) / 1000;
            break;
        default:
            return 'ERROR';
    }
}

function answer(num1, num2, opSign) {
    display.innerText = operation(num1, num2, opSign);
    recentEquation = true;
    fullDisplay = true;
    firstOperand = display.innerText;
    secondOperand = '';
    operatorSign = '';
}

for (let i = 0; i < operator.length; i++) {
    operator[i].onclick = function () {
        if (recentEquation == false) {
            if (firstOperand !== '') {
                answer(firstOperand, display.innerText, operatorSign);
                operatorSign = operator[i].innerText;
                recentEquation = false;
            } else {
                firstOperand = display.innerText;
                operatorSign = operator[i].innerText;
                fullDisplay = true;
            }
        } else {
            operatorSign = operator[i].innerText;
            recentEquation = false;
            fullDisplay = true;
        }
    }
}

for (let i = 0; i < numbers.length; i++) {
    numbers[i].onclick = function () {
        if (fullDisplay == true) {
            display.innerText = '';
            fullDisplay = false;
        }
        display.innerText += numbers[i].innerText;
    };
}

clear.onclick = () => {
    fullDisplay = false;
    recentEquation = false;
    display.innerText = '0';
    firstOperand = '';
    secondOperand = '';
    operatorSign = '';
}

equals.onclick = () => {
    if (recentEquation == false) {
        answer(firstOperand, display.innerText, operatorSign);
    }
};