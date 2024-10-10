function calculateSum() {
  const num1 = parseFloat(document.getElementById("num1").value) || 0;
  const num2 = parseFloat(document.getElementById("num2").value) || 0;
  const result = num1 + num2;
  document.getElementById("result").textContent = "Hasil: " + result;
}

function resetFields() {
  document.getElementById("num1").value = "";
  document.getElementById("num2").value = "";
  document.getElementById("result").textContent = "Hasil: ";
}
