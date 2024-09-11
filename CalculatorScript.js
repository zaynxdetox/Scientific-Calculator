let display = document.getElementById('result');

function input(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = '';
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        let expression = display.value;

        expression = expression.replace(/\^/g, '**');
        expression = expression.replace(/sqrt\(/g, 'Math.sqrt(');
        expression = expression.replace(/sin\(([^)]+)\)/g, 'Math.sin(toRadians($1))');
        expression = expression.replace(/cos\(([^)]+)\)/g, 'Math.cos(toRadians($1))');
        expression = expression.replace(/tan\(([^)]+)\)/g, 'Math.tan(toRadians($1))');
        expression = expression.replace(/log\(/g, 'Math.log10(');
        expression = expression.replace(/exp\(/g, 'Math.exp(');

        let result = eval(expression);

        display.value = roundToPrecision(result, 10);
    } catch (error) {
        display.value = 'Syntax Error';
    }
}

function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

function roundToPrecision(value, precision) {
    return parseFloat(value.toFixed(precision));
}

document.addEventListener('keydown', function(event) {
    const key = event.key;

    if (!isNaN(key) || ['+', '-', '*', '/', '(', ')', '.', '%', '^'].includes(key)) {
        input(key);
        pressButton(key);
    } else if (key === 'Enter') {
        event.preventDefault();
        calculate();
        pressButton('=');
    } else if (key === 'Backspace') {
        deleteLast();
        pressButton('DEL');
    } else if (key === 'Escape') {
        clearDisplay();
        pressButton('C');
    }
});

function pressButton(key) {
    let button;

    switch (key) {
        case '+':
            button = document.querySelector("button[onclick=\"input('+')\"]");
            break;
        case '-':
            button = document.querySelector("button[onclick=\"input('-')\"]");
            break;
        case '*':
            button = document.querySelector("button[onclick=\"input('*')\"]");
            break;
        case '/':
            button = document.querySelector("button[onclick=\"input('/')\"]");
            break;
        case 'Enter':
            button = document.querySelector("button[onclick=\"calculate()\"]");
            break;
        case 'Backspace':
            button = document.querySelector("button[onclick=\"deleteLast()\"]");
            break;
        case 'Escape':
            button = document.querySelector("button[onclick=\"clearDisplay()\"]");
            break;
        default:
            button = document.querySelector(`button[onclick="input('${key}')"]`);
    }

    if (button) {
        button.classList.add('pressed');
        setTimeout(() => {
            button.classList.remove('pressed');
        }, 150);
    }
}
