const display = document.getElementById('display');
const numbers = document.getElementsByClassName('number');
const operator = document.getElementsByClassName('operator');
const clear = document.getElementById('clear');
const equals = document.getElementById('equals');
let firstOperand = '';
let secondOperand = '';
let operatorSign = '';
let fullDisplay = false;

function quot(x, y) {
    if (y == 0) {
        return "ERROR";
    } else {
        console.log(`${x} / ${y} = ${x / y}`)
        return x / y;
    }
}

function operation(num1, num2, operand) {
    switch (operand) {
        case '+':
            return ((parseFloat(num1) + parseFloat(num2)) * 1000) / 1000;
            break;
        case '-':
            return ((num1 - num2) * 1000) / 1000;
            break;
        case '*':
            return ((num1 * num2) * 1000) / 1000;
            break;
        case '/':
            return quot(num1, num2);
            break;
        case 'x^y':
            return ((num1 ** num2) * 1000) / 1000;
            break;
        default:
            return 'ERROR';
    }


}

function answer() {
    // secondOperand = display.innerText;
    console.log('pre ' + firstOperand);
    console.log('pre ' + operatorSign);
    console.log('pre ' + secondOperand);
    display.innerText = operation(firstOperand, secondOperand, operatorSign);
    fullDisplay = true;
    firstOperand = display.innerText;
    secondOperand = '';
    operatorSign = '';
    console.log('post ' + firstOperand);
    console.log('post ' + operatorSign);
    console.log('post ' + secondOperand);
}

function clearDisplay() {
    fullDisplay = false;
    display.innerText = '';
    firstOperand = '';
    secondOperand = '';
}

function addToDisplay(num) {
    display.innerText += num;
}

for (let i = 0; i < operator.length; i++) {
    operator[i].onclick = function () {
        if (firstOperand !== '' && secondOperand == '') {
            if (display.innerText !== '') {
                secondOperand = display.innerText;
                answer();
            }
            operatorSign = operator[i].innerText;
        } else if (firstOperand !== '' && secondOperand !== '') {
            answer();
            operatorSign = operator[i].innerText;
        } else {
            fullDisplay = false;
            operatorSign = operator[i].innerText;
            firstOperand = display.innerText;
            display.innerText = '';
        }
    }
}

for (let i = 0; i < numbers.length; i++) {
    numbers[i].onclick = function () {
        if (fullDisplay == true) {
            display.innerText = '';
            firstOperand = '';
            fullDisplay = false;
        }
        addToDisplay(numbers[i].innerText)
    };
}

clear.onclick = clearDisplay;

equals.onclick = function () {
    secondOperand = display.innerText;
    answer();
}