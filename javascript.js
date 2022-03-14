
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

}