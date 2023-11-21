/* By Nellose [https://github.com/Nellose/] */

document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.getElementById('buttons');
    let currentInput = '0';
    let firstOperand = null;
    let operator = null;
    let awaitingNextInput = false;

    buttons.addEventListener('click', function (event) {
        if (event.target.matches('button')) {
            handleButtonClick(event.target.value);
            updateDisplay();
        }
    });

    function handleButtonClick(value) {
        if (value === 'clear') {
            clearAll();
        } else if (isNumber(value)) {
            inputDigit(value);
        } else if (isOperator(value)) {
            handleOperator(value);
        } else if (value === 'decimal') {
            inputDecimal();
        } else if (value === 'calculate') {
            performCalculation();
        }
    }

    function isNumber(value) {
        return !isNaN(value);
    }

    function inputDigit(digit) {
        if (currentInput === '0' || awaitingNextInput) {
            currentInput = digit;
            awaitingNextInput = false;
        } else {
            currentInput += digit;
        }
    }

    function inputDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentInput);
        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = performCalculation();
            currentInput = String(result);
            firstOperand = result;
        }
        operator = nextOperator;
        awaitingNextInput = true;
    }

    function performCalculation() {
        const inputValue = parseFloat(currentInput);
        if (operator === 'add') {
            currentInput = String(firstOperand + inputValue);
        } else if (operator === 'subtract') {
            currentInput = String(firstOperand - inputValue);
        } else if (operator === 'multiply') {
            currentInput = String(firstOperand * inputValue);
        } else if (operator === 'divide') {
            currentInput = String(firstOperand / inputValue);
        }
        operator = null;
        awaitingNextInput = true;
        return parseFloat(currentInput);
    }

    function clearAll() {
        currentInput = '0';
        firstOperand = null;
        operator = null;
        awaitingNextInput = false;
    }

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function isOperator(value) {
        return ['add', 'subtract', 'multiply', 'divide'].includes(value);
    }
});

/* By Nellose [https://github.com/Nellose/] */
