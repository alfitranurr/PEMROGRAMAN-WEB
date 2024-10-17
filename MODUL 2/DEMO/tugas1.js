const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");
const themeToggleCheckbox = document.getElementById("toggle");

let input = "";
let lastResult = null;

themeToggleCheckbox.addEventListener("change", () => {
  document.body.classList.toggle("light-theme");
});

function updateDisplay() {
  display_input.innerHTML = CleanInput(input);
}

function pressButton(keyValue) {
  const key = Array.from(keys).find((k) => k.dataset.key === keyValue);
  if (key) {
    key.click();
  }
}

for (let key of keys) {
  const value = key.dataset.key;

  key.addEventListener("click", () => {
    if (value === "clear") {
      input = "";
      lastResult = null;
      display_input.innerHTML = "";
      display_output.innerHTML = "";
    } else if (value === "backspace") {
      input = input.slice(0, -1);
      updateDisplay();
    } else if (value === "=") {
      try {
        let result = eval(PrepareInput(input));
        display_output.innerHTML = CleanOutput(result);
        lastResult = result;
        input = "";
      } catch (error) {
        display_output.innerHTML = "Error: Invalid Expression";
      }
    } else if (value === "brackets") {
      if (
        input.indexOf("(") === -1 ||
        (input.indexOf("(") !== -1 &&
          input.indexOf(")") !== -1 &&
          input.lastIndexOf("(") < input.lastIndexOf(")"))
      ) {
        input += "(";
      } else if (
        (input.indexOf("(") !== -1 && input.indexOf(")") === -1) ||
        (input.indexOf("(") !== -1 &&
          input.indexOf(")") !== -1 &&
          input.lastIndexOf("(") > input.lastIndexOf(")"))
      ) {
        input += ")";
      }

      updateDisplay();
    } else if (value === "squared") {
      try {
        if (input !== "") {
          let squaredValue = Math.pow(parseFloat(input), 2);
          display_output.innerHTML = CleanOutput(squaredValue);
          lastResult = squaredValue;
          input = "";
        } else if (lastResult !== null) {
          let squaredValue = Math.pow(parseFloat(lastResult), 2);
          display_output.innerHTML = CleanOutput(squaredValue);
          lastResult = squaredValue;
          input = "";
        }
      } catch (error) {
        display_output.innerHTML = "Error: Invalid Input";
      }
    } else {
      if (ValidateInput(value)) {
        if (lastResult !== null) {
          input += lastResult;
          lastResult = null;
        }
        input += value;
        updateDisplay();
      }
    }
  });
}

document.addEventListener("keydown", (event) => {
  const key = event.key;

  const keyMap = {
    Enter: "=",
    Backspace: "backspace",
    Escape: "clear",
    "(": "brackets",
    ")": "brackets",
    "%": "%",
    "^": "squared",
    "/": "/",
    "*": "*",
    "-": "-",
    "+": "+",
    ".": ".",
    "=": "=",
    // Angka
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
  };

  if (key in keyMap) {
    event.preventDefault();
    pressButton(keyMap[key]);
  }
});

function CleanInput(input) {
  let input_array = input.split("");
  let input_array_length = input_array.length;

  for (let i = 0; i < input_array_length; i++) {
    if (input_array[i] === "*") {
      input_array[i] = ` <span class="operator">x</span> `;
    } else if (input_array[i] === "/") {
      input_array[i] = ` <span class="operator">÷</span> `;
    } else if (input_array[i] === "+") {
      input_array[i] = ` <span class="operator">+</span> `;
    } else if (input_array[i] === "-") {
      input_array[i] = ` <span class="operator">-</span> `;
    } else if (input_array[i] === "(") {
      input_array[i] = `<span class="brackets">(</span>`;
    } else if (input_array[i] === ")") {
      input_array[i] = `<span class="brackets">)</span>`;
    } else if (input_array[i] === "%") {
      input_array[i] = `<span class="percent">%</span>`;
    }
  }

  return input_array.join("");
}

function CleanOutput(output) {
  let output_string = output.toString();
  let decimal = output_string.split(".")[1];
  output_string = output_string.split(".")[0];

  let output_array = output_string.split("");

  if (output_array.length > 3) {
    for (let i = output_array.length - 3; i > 0; i -= 3) {
      output_array.splice(i, 0, ",");
    }
  }

  if (decimal) {
    output_array.push(".");
    output_array.push(decimal);
  }

  return output_array.join("");
}

function ValidateInput(value) {
  let last_input = input.slice(-1);
  let operators = ["+", "-", "*", "/"];

  if (value === "." && last_input === ".") {
    return false;
  } // tidak diizinkan untuk memasukkan . dua kali

  if (operators.includes(value)) {
    if (operators.includes(last_input)) {
      return false;
    } else {
      return true;
    }
  } // tidak bisa masukin operator 2 kali ex : ++, --

  return true;
}

function PrepareInput(input) {
  let input_array = input.split(""); // dipisah menjadi array ex : 50% => '5', '0', '%'

  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] === "%") {
      input_array[i] = "/100";
    }
  }

  return input_array.join("");
}
