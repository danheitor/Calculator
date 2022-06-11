const previous = document.getElementById("display1");
const current = document.getElementById("display2");
const buttons = document.querySelector(".btns");
let newOperation = false;
let operand = "";
let valueA = "";
let valueB = "";
let result = "";
let key = "";

buttons.addEventListener("click", (e) => {
  keyHandler(e.target.innerText);
});

window.addEventListener("keydown", (e) => {
  if (e.key == "+" || e.key == "-" || e.key == "*" || e.key == "/")
    keyHandler(e.key);
  if (e.key == "Enter" || e.key == "=") keyHandler("=");
  if (e.key == "x" || e.key == "X") keyHandler("*");
  if (e.key >= 0 && e.key <= 9) keyHandler(e.key);
  if (e.key == "." || e.key == ",") keyHandler(".");
});

function keyHandler(e) {
  key = e;
  if (current.innerText == 0 || current.innerText == "Error, can't divide by 0")
    previous.innerText = current.innerText = "";

  if (key == ".") {
    if (!current.innerText.includes(".")) {
      current.innerText == 0
        ? (current.innerText = "0.")
        : (current.innerText += ".");
      operand == ""
        ? (valueA = current.innerText)
        : (valueB = current.innerText);
      previous.innerText = valueA + " " + operand;
    }
  }
  if (!isNaN(key)) {
    if (current.innerText.length >= 10) return;
    if (newOperation == true && operand == "") {
      allClear();
      newOperation = false;
    }
    if (operand == "") {
      valueA += key;
      current.innerText = valueA + " ";
    } else {
      previous.innerText = valueA + " " + operand;
      valueB += key;
      current.innerText = valueB;
    }
  }

  /////////////////////////////////////////////////////////////////////////////////
  if (key == "+" || key == "-" || key == "/" || key == "*" || key == "%") {
    if (valueA == "") return (current.innerText = 0);
    if (valueA !== "" && valueB !== "" && operand !== "") {
      calculate(valueA, valueB, operand, key);
    } else {
      operand = key;
      previous.innerText = valueA + " " + operand + " ";
      current.innerText = "";
    }
  }

  if (key == "+/-") {
    if (operand == "") {
      valueA *= -1;
      current.innerText = valueA;
    } else {
      valueB *= -1;
      current.innerText = valueB;
    }
  }

  if (key == "=") {
    if (valueA && valueB && operand) {
      calculate(valueA, valueB, operand);
      current.innerText = "=" + " " + result;
      if (result == 0) {
        allClear();
        current.innerText = 0;
      }

      operand = "";
      newOperation = true;
    } else return;
  }

  if (key == "AC") allClear();
}

function calculate(a, b, sign) {
  if (sign == "/" && valueB == "0") {
    current.innerText = result = "Error, can't divide by 0";
    valueA = valueB = operand = "";
    return;
  }
  if (sign == "+") {
    result = Number(a) + Number(b);
    generateResult(a, b, sign, result);
  }
  if (sign == "-") {
    result = Number(a) - Number(b);
    generateResult(a, b, sign, result);
  }
  if (sign == "*") {
    result = Number(a) * Number(b);
    generateResult(a, b, sign, result);
  }
  if (sign == "/") {
    result = parseFloat(a) / parseFloat(b);
    generateResult(a, b, sign, result);
  }
  if (sign == "%") {
    result = parseFloat(a) % parseFloat(b);
    generateResult(a, b, sign, result);
  }
}

function allClear() {
  current.innerText = "0";
  previous.innerText = "";
  operand = "";
  valueA = "";
  valueB = "";
  result = "";
}

function generateResult(a, b, sign, result) {
  result = Math.round(result * 1000) / 1000;
  previous.innerText = a + " " + sign + " " + b;
  current.innerText = result + " " + key + " ";
  valueA = result;
  valueB = "";
  operand = key;
}
