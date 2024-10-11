const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");
const themeToggleCheckbox = document.getElementById("toggle");

let input = ""; // Menyimpan seluruh ekspresi
let lastResult = null; // Menyimpan hasil terakhir

// Fungsi untuk mengubah tema
themeToggleCheckbox.addEventListener("change", () => {
  document.body.classList.toggle("light-theme");
});

for (let key of keys) {
  const value = key.dataset.key;

  key.addEventListener("click", () => {
    if (value === "clear") {
      input = "";
      lastResult = null; // Reset hasil terakhir saat dihapus
      display_input.innerHTML = "";
      display_output.innerHTML = "";
    } else if (value === "backspace") {
      input = input.slice(0, -1);
      display_input.innerHTML = CleanInput(input);
    } else if (value === "=") {
      try {
        let result = eval(PrepareInput(input));
        display_output.innerHTML = CleanOutput(result);
        lastResult = result; // Simpan hasil untuk perhitungan lebih lanjut
        input = ""; // Kosongkan input untuk ekspresi baru
      } catch (error) {
        display_output.innerHTML = "Error: Invalid Expression"; // Tampilkan error yang lebih jelas
      }
    } else if (value === "brackets") {
      // Fungsionalitas tanda kurung
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

      display_input.innerHTML = CleanInput(input);
    } else if (value === "squared") {
      try {
        if (input !== "") {
          let squaredValue = Math.pow(parseFloat(input), 2); // Hitung kuadrat
          display_output.innerHTML = CleanOutput(squaredValue);
          lastResult = squaredValue; // Simpan hasil pangkat dua untuk perhitungan lebih lanjut
          input = ""; // Kosongkan input untuk ekspresi baru
        } else if (lastResult !== null) {
          // Jika hasil terakhir ada, hitung kuadrat dari hasil tersebut
          let squaredValue = Math.pow(parseFloat(lastResult), 2);
          display_output.innerHTML = CleanOutput(squaredValue);
          lastResult = squaredValue; // Simpan hasil pangkat dua untuk perhitungan lebih lanjut
          input = ""; // Kosongkan input untuk ekspresi baru
        }
      } catch (error) {
        display_output.innerHTML = "Error: Invalid Input";
      }
    } else {
      if (ValidateInput(value)) {
        if (lastResult !== null) {
          input += lastResult;
          lastResult = null; // Reset lastResult setelah menggunakannya
        }
        input += value;
        display_input.innerHTML = CleanInput(input);
      }
    }
  });
}

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
  }

  if (operators.includes(value)) {
    if (operators.includes(last_input)) {
      return false;
    } else {
      return true;
    }
  }

  return true;
}

function PrepareInput(input) {
  let input_array = input.split("");

  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] === "%") {
      input_array[i] = "/100";
    }
  }

  return input_array.join("");
}
