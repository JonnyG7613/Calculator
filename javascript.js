const display = document.getElementById('display');
const numbers = document.getElementsByClassName('number');
const operator = document.getElementsByClassName('operator');
const clear = document.getElementById('clear');
const equals = document.getElementById('equals');


function sum(x, y) {
    return x + y;
}

function diff(x, y) {
    return x - y;
}

function prod(x, y) {
    return x * y;
}

function quot(x, y) {
    if (y == 0) {
        return "ERROR";
    } else {
        return x / y;
    }
}

function operation(num1, num2, operand) {
    switch (operand) {
        case 'plus':
            sum(num1, num2);
            break;
        case 'diff':
            diff(num1, num2);
            break;
        case 'prod':
            prod(num1, num2);
            break;
        case 'quot':
            quot(num1, num2);
            break;
    }


}

function clearDisplay() {
    display.innerText = '';
    console.log('clear');
}

function addToDisplay(num) {
    display.innerText += num;
    console.log(num);
}


for (let i = 0; i < numbers.length; i++) {
    numbers[i].onclick = function () {
        addToDisplay(numbers[i].innerText)
    };
}

clear.onclick = clearDisplay;
