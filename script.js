let output = document.getElementById("output");
let history = document.getElementById("history");

let currentInput = "";
let operator = "";
let firstValue = null;

document.querySelectorAll("button").forEach(button => {
    button.addEventListener("click", () => handleInput(button.dataset.value));
});

function handleInput(value) {
    if (!value) return;

    if (!isNaN(value) || value === ".") {
        currentInput += value;
        updateDisplay(currentInput);
    } 
    else if (value === "C") {
        clearAll();
    } 
    else if (value === "DEL") {
        currentInput = currentInput.slice(0, -1);
        updateDisplay(currentInput || "0");
    } 
    else if (value === "=") {
        calculate();
    } 
    else {
        setOperator(value);
    }
}

function updateDisplay(value) {
    output.innerText = value;
}

function clearAll() {
    currentInput = "";
    operator = "";
    firstValue = null;
    history.innerText = "";
    output.innerText = "0";
}

function setOperator(op) {
    if (currentInput === "") return;
    firstValue = parseFloat(currentInput);
    operator = op;
    history.innerText = `${firstValue} ${operator}`;
    currentInput = "";
}

function calculate() {
    if (firstValue === null || currentInput === "") return;

    let secondValue = parseFloat(currentInput);
    let result;

    switch (operator) {
        case "+": result = firstValue + secondValue; break;
        case "-": result = firstValue - secondValue; break;
        case "*": result = firstValue * secondValue; break;
        case "/": result = secondValue !== 0 ? firstValue / secondValue : "Error"; break;
        case "%": result = firstValue % secondValue; break;
        default: return;
    }

    history.innerText = `${firstValue} ${operator} ${secondValue}`;
    output.innerText = result;

    currentInput = result.toString();
    operator = "";
    firstValue = null;
}