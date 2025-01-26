const screen = document.getElementById("screen");
let currentInput = "0";
let previousInput = null;
let operator = null;

document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.textContent;

    if (value === "AC") {
      reset();
    } else if (value === "±") {
      toggleSign();
    } else if (value === "%") {
      percentage();
    } else if (["÷", "×", "−", "+"].includes(value)) {
      setOperator(value);
    } else if (value === "=") {
      calculate();
    } else if (value === ".") {
      addDecimal();
    } else {
      appendNumber(value);
    }

    updateScreen();
  });
});

function reset() {
  currentInput = "0";
  previousInput = null;
  operator = null;
}

function toggleSign() {
  currentInput = String(parseFloat(currentInput) * -1);
}

function percentage() {
  currentInput = String(parseFloat(currentInput) / 100);
}

function setOperator(op) {
  if (operator && previousInput !== null) {
    calculate();
  }
  operator = op;
  previousInput = currentInput;
  currentInput = "0";
}

function calculate() {
  if (operator && previousInput !== null) {
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);
    switch (operator) {
      case "÷":
        currentInput = String(prev / curr);
        break;
      case "×":
        currentInput = String(prev * curr);
        break;
      case "−":
        currentInput = String(prev - curr);
        break;
      case "+":
        currentInput = String(prev + curr);
        break;
    }
    operator = null;
    previousInput = null;
  }
}

function addDecimal() {
  if (!currentInput.includes(".")) {
    currentInput += ".";
  }
}

function appendNumber(number) {
  if (currentInput === "0") {
    currentInput = number;
  } else {
    currentInput += number;
  }
}

function updateScreen() {
  screen.textContent = currentInput;
}
