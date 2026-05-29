let display = document.getElementById('display');
let expression = '';


function appendNumber(num) {
    handleSpecialCases();
    expression += num;
    display.value = expression;
}


function appendOperator(op) {
    handleSpecialCases();
    lastChar = expression.charAt(expression.length - 1);

    if (lastChar !== '+' && lastChar !== '-' && lastChar !== '×' && lastChar !== '÷' && lastChar !== '.') {
        expression += op;
        display.value = expression;
    }
}


function appendDecimal() {
    handleSpecialCases();
    lastChar = expression.charAt(expression.length - 1);

    if (lastChar !== '+' && lastChar !== '-' && lastChar !== '×' && lastChar !== '÷' && lastChar !== '.') {
        if (expression !== '') {
            expression += '.';
            display.value = expression;
        }
    }
}


function clearDisplay() {
    expression = '';
    display.value = expression;
}


function deleteLast() {
    let lastThreeCharacters = expression.slice(-3);
    let lastFiveCharacters = expression.slice(-5);
    let lastEightCharacters = expression.slice(-8);
    let lastNineCharacters = expression.slice(-9);

    if (lastThreeCharacters === 'NaN') {
        expression = expression.slice(0, -3);
        display.value = expression;
    } else if (lastFiveCharacters === 'Error') {
        expression = expression.slice(0, -5);
        display.value = expression;
    } else if (lastNineCharacters === '-Infinity') {
        expression = expression.slice(0, -9);
        display.value = expression;
    } else if (lastEightCharacters === 'Infinity') {
        expression = expression.slice(0, -8);
        display.value = expression;
    } else {
        expression = expression.slice(0, -1);
        display.value = expression;
    }   
}


function handleSpecialCases() {
    if (expression === 'NaN' || expression === 'Error' || expression === '-Infinity' || expression === 'Infinity') {
        expression = '';
        updateDisplay();
    }
}



function calculate() {
    try {
        let modifiedExpression = expression.replace(/×/g, '*').replace(/÷/g, '/');
        let result = eval(modifiedExpression);
        expression = result.toString();
        display.value = expression;
    } catch (error) {
        expression = 'Error';
        display.value = expression;
    }
}