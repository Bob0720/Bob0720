document.getElementById('switch-to-standard').addEventListener('click', function() {
    document.getElementById('standard-calculator').classList.remove('hidden');
    document.getElementById('scientific-calculator').classList.add('hidden');
    document.getElementById('calculator-history').classList.add('hidden');
});

document.getElementById('switch-to-scientific').addEventListener('click', function() {
    document.getElementById('standard-calculator').classList.add('hidden');
    document.getElementById('scientific-calculator').classList.remove('hidden');
    document.getElementById('calculator-history').classList.add('hidden');
});

document.getElementById('view-history').addEventListener('click', function() {
    document.getElementById('standard-calculator').classList.add('hidden');
    document.getElementById('scientific-calculator').classList.add('hidden');
    document.getElementById('calculator-history').classList.remove('hidden');
    fetchHistory();
});
function appendToDisplay(value) {
    const display = document.getElementById('display'); 
    display.textContent += value;
}

function calculateResult() {
    let display = document.getElementById('display');
    let expression = display.textContent;

    expression = expression.replace(/×/g, '*')
                           .replace(/÷/g, '/')
                           .replace(/pi/g, 'Math.PI')
                           .replace(/e/g, 'Math.E')
                           .replace(/sqrt\(/g, 'Math.sqrt(')
                           .replace(/\^/g, '**');

    expression = expression.replace(/sin\(/g, 'Math.sin(')
                           .replace(/cos\(/g, 'Math.cos(')
                           .replace(/tan\(/g, 'Math.tan(')
                           .replace(/log\(/g, 'Math.log('); 

    try {
        let result = new Function('return ' + expression)();
        display.textContent = result.toString();
	storeHistory(expression, result.toString());
    } catch (error) {
        display.textContent = 'Error';
    }
}function clearDisplay() {
    const display = document.getElementById('display');
    display.textContent = '';
}

function storeHistory(operation, result) {
    let history = localStorage.getItem('calculatorHistory');
    if (history) {
        history = JSON.parse(history);
    } else {
        history = [];
    }

    history.push({ operation, result });

    localStorage.setItem('calculatorHistory', JSON.stringify(history));
}

function fetchHistory() {
    let history = localStorage.getItem('calculatorHistory');
    if (history) {
        history = JSON.parse(history);
    } else {
        history = [];
    }

    const historyDisplay = document.getElementById('calculator-history');

    historyDisplay.innerHTML = '';

    history.forEach((entry) => {
        const operationElement = document.createElement('div');
        operationElement.textContent = `Operation: ${entry.operation}, Result: ${entry.result}`;
        historyDisplay.appendChild(operationElement);
    });
}
