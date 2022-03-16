const display = document.getElementById('lowerDisplay');
const upperDisplay = document.getElementById('upperDisplay');
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
        case '^':
            return Math.round((num1 ** num2) * 1000) / 1000;
            break;
        default:
            return 'ERROR';
    }
}

function answer(num1, num2, opSign) {
    upperDisplay.innerText = `${num1} ${opSign} ${num2}`;
    let tempAnswer = operation(num1, num2, opSign);
    if (tempAnswer > 99999999999) {
        display.innerText = tempAnswer.toExponential(4);
    } else {
        display.innerText = tempAnswer;
    }
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
                upperDisplay.innerText = `${firstOperand} ${operatorSign} ${display.innerText}`;
                answer(firstOperand, display.innerText, operatorSign);
                operatorSign = operator[i].innerText;
                recentEquation = false;
            } else {
                firstOperand = display.innerText;
                operatorSign = operator[i].innerText;
                fullDisplay = true;
                upperDisplay.innerText = `${firstOperand} ${operatorSign}`;
            }
        } else {
            operatorSign = operator[i].innerText;
            recentEquation = false;
            fullDisplay = true;
            upperDisplay.innerText = `x${firstOperand} ${operatorSign}`;
        }
    }
}

for (let i = 0; i < numbers.length; i++) {
    numbers[i].onclick = function () {
        if (fullDisplay == true) {
            if (recentEquation == true) {
                firstOperand = '';
                recentEquation = false;
            }
            display.innerText = '';
            fullDisplay = false;
        }
        if (display.innerText.length < 9) {
            display.innerText += numbers[i].innerText;
        } else {
            upperDisplay.innerText = 'Display maxed.';
        }
    };
}

clear.onclick = () => {
    fullDisplay = true;
    recentEquation = false;
    display.innerText = '0';
    upperDisplay.innerText = '';
    firstOperand = '';
    secondOperand = '';
    operatorSign = '';
}

equals.onclick = () => {
    if (recentEquation == false) {
        if (firstOperand !== '' && operatorSign !== '') {
            answer(firstOperand, display.innerText, operatorSign);
        }
    }
};