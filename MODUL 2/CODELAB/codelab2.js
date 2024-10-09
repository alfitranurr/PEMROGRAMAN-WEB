const registerButton = document.getElementById("register");
const loginButton = document.getElementById("login");
const container = document.getElementById("container");

// Menambahkan event listener untuk tombol register
registerButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

// Menambahkan event listener untuk tombol login
loginButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

// Fungsi untuk validasi form register
function validateRegisterForm() {
  const name = document.querySelector(
    '.register-container input[placeholder="Name"]'
  );
  const email = document.querySelector(
    '.register-container input[placeholder="Email"]'
  );
  const password = document.querySelector(
    '.register-container input[placeholder="Password"]'
  );
  const errorMessages = document.querySelectorAll(
    ".register-container .error-message"
  );

  let isValid = true;
  let emptyFields = [];

  clearErrorMessages(errorMessages);

  if (!name.value) {
    highlightError(name, "Name is required");
    isValid = false;
    emptyFields.push("Name");
  }

  if (!email.value) {
    highlightError(email, "Email is required");
    isValid = false;
    emptyFields.push("Email");
  }

  if (!password.value) {
    highlightError(password, "Password is required");
    isValid = false;
    emptyFields.push("Password");
  }

  if (!isValid) {
    alert("Please fill in the following fields: " + emptyFields.join(", "));
  }

  return isValid;
}

// Fungsi untuk validasi form login
function validateLoginForm() {
  const email = document.querySelector(
    '.login-container input[placeholder="Email"]'
  );
  const password = document.querySelector(
    '.login-container input[placeholder="Password"]'
  );
  const errorMessages = document.querySelectorAll(
    ".login-container .error-message"
  );

  let isValid = true;
  let emptyFields = [];

  clearErrorMessages(errorMessages);

  if (!email.value) {
    highlightError(email, "Email is required");
    isValid = false;
    emptyFields.push("Email");
  }

  if (!password.value) {
    highlightError(password, "Password is required");
    isValid = false;
    emptyFields.push("Password");
  }

  if (!isValid) {
    alert("Please fill in the following fields: " + emptyFields.join(", "));
  }

  return isValid;
}

// Fungsi untuk menyoroti input yang error dan menampilkan pesan
function highlightError(inputField, errorMessage) {
  inputField.classList.add("blinking-border");
  const errorElement = inputField.nextElementSibling; // Elemen <span> setelah input
  errorElement.textContent = errorMessage;
  errorElement.style.color = "red";

  // Menghapus animasi kedip dan pesan kesalahan setelah 10 detik
  setTimeout(() => {
    inputField.classList.remove("blinking-border");
    errorElement.textContent = "";
  }, 10000);
}

// Fungsi untuk membersihkan semua pesan kesalahan sebelumnya
function clearErrorMessages(errorMessages) {
  errorMessages.forEach((errorMessage) => {
    errorMessage.textContent = "";
  });
}

// Event listener untuk tombol Register
const registerForm = document.querySelector(".register-container form");
registerForm.addEventListener("submit", (event) => {
  if (!validateRegisterForm()) {
    event.preventDefault(); // Mencegah submit form jika validasi gagal
  }
});

// Event listener untuk tombol Login
const loginForm = document.querySelector(".login-container form");
loginForm.addEventListener("submit", (event) => {
  if (!validateLoginForm()) {
    event.preventDefault(); // Mencegah submit form jika validasi gagal
  }
});
