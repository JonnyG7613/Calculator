const display = document.getElementById('lowerDisplay');
const upperDisplay = document.getElementById('upperDisplay');
const numbers = document.getElementsByClassName('number');
const operator = document.getElementsByClassName('operator');
const clear = document.getElementById('clear');
const equals = document.getElementById('equals');
const backspace = document.getElementById('backspace');
const negSwitch = document.getElementById('negSwitch')
let firstOperand = '';
let secondOperand = '';
let operatorSign = '';
let fullDisplay = true;
let previousOperator = '';
let previousSecondOperand = '';
display.innerText = 0;
let recentEquation = false;
let prevDecimal = false;

function quot(x, y) {
    if (y == 0) {
        fullDisplay = true;
        return "ERROR";
    } else {
        return Math.round((x / y) * 1000) / 1000;
    }
}

function negativeSwitch(x) {
    if (display.innerText.charAt(0) == '-') {
        display.innerText = display.innerText.substring(1);
    } else {
        display.innerText = '-' + display.innerText;
    }
}

// Checks which operation to use then performs said operation.
function operation(num1, num2, operand) {
    if (num1 == '.' || num2 == '.' || num1 == '-' || num2 == '-') {
        return 'ERROR';
    }
    switch (operand) {
        case '+':
            return Math.round((parseFloat(num1) + parseFloat(num2)) * 1000) / 1000;
            break;
        case '-':
            return Math.round((num1 - num2) * 1000) / 1000;
            break;
        case 'x':
            return Math.round((num1 * num2) * 1000) / 1000;
            break;
        case '/':
            return quot(num1, num2);
            break;
        case '^':
            return Math.round((num1 ** num2) * 1000) / 1000;
            break;
        default:
            fullDisplay = true;
            console.log(2);
            return 'ERROR';
    }
}

// Takes parameters, solves the equation and sets values for following operands/operators.
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

function enterNumbers(number) {
    if (fullDisplay == true && recentEquation == true) {
        display.innerText = '';
        firstOperand = '';
        fullDisplay = false;
        recentEquation = false;
    } else if (fullDisplay == true) {
        display.innerText = '';
        fullDisplay = false;
    }

    if (display.innerText.length < 9) {
        display.innerText += number.innerText;
    } else {
        upperDisplay.innerText = 'Display maxed.';
    }
}

// erases one digit at a time. if one digit left, sets it to 0
function erase() {
    if (fullDisplay == false && display.innerText.length > 1) {
        display.innerText = display.innerText.slice(0, -1);
    } else {
        display.innerText = 0;
        fullDisplay = true;
    }
}

// solves the equation if all paramters are available
function solve() {
    if (recentEquation == false && firstOperand !== '' && operatorSign !== '') {
        prevDecimal = false;
        answer(firstOperand, display.innerText, operatorSign);
    }
}

for (let i = 0; i < operator.length; i++) {
    operator[i].onclick = function () {
        if (display.innerText !== 'ERROR') {
            if (recentEquation == false && firstOperand !== '') {
                upperDisplay.innerText = `${firstOperand} ${operatorSign} ${display.innerText}`;
                answer(firstOperand, display.innerText, operatorSign);
                operatorSign = operator[i].innerText;
                recentEquation = true;
                prevDecimal = false;
            } else if (recentEquation == false) {
                firstOperand = display.innerText;
                operatorSign = operator[i].innerText;
                fullDisplay = true;
                prevDecimal = false;
                upperDisplay.innerText = `${firstOperand} ${operatorSign}`;
                display.innerText = 0;
            } else {
                operatorSign = operator[i].innerText;
                recentEquation = false;
                fullDisplay = true;
                prevDecimal = false;
                upperDisplay.innerText = `${firstOperand} ${operatorSign}`;
                display.innerText = 0;
            }
        }
    }
}

// Checks if a decimal is pressed - if not, it proceeds to add the number to the display
// or perform an operation, as needed.  If a decimal is pressed, as long as there isn't
// already a decimal present, the display will insert a decimal, otherwise nothing happens.
for (let i = 0; i < numbers.length; i++) {
    numbers[i].onclick = function () {
        if (numbers[i].innerText == '.' && prevDecimal == false) {
            enterNumbers(numbers[i]);
            prevDecimal = true;
        } else if (numbers[i].innerText == '.' && prevDecimal == true) { }
        else {
            enterNumbers(numbers[i]);
        }
    }
}

// Clears all values and the display.
clear.onclick = () => {
    fullDisplay = true;
    recentEquation = false;
    display.innerText = '0';
    upperDisplay.innerText = '';
    firstOperand = '';
    secondOperand = '';
    operatorSign = '';
    prevDecimal = false;
}

// Changes number from positive to negative and vice versa
negSwitch.onclick = () => {
    if (display.innerText !== 'ERROR') {
        console.log(1);
        negativeSwitch();
    }
}

// Solves the equation entered as long as all parameters are present.
equals.onclick = solve;

// Backspaces. If there's only 1 digit, changes display to 0 instead.
backspace.onclick = erase;