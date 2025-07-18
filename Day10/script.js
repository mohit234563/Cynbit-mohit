const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const strengthMeter = document.getElementById("strengthMeter");
const rememberMe = document.getElementById("rememberMe");

// Load saved email if "remember me" was checked

window.onload = () => {
  const savedEmail = localStorage.getItem("savedEmail");
  if (savedEmail) {
    emailInput.value = savedEmail;
    rememberMe.checked = true;
  }
};

// Email validation regex (must contain @gmail.com)
function validateEmail(email) {
  const pattern = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  return pattern.test(email);
}

// Password strength checker
function checkPasswordStrength(password) {
  let strength = 0;
  if (password.length >= 6) strength++;
  if (/[A-Z]/.test(password)) strength++;
  if (/[0-9]/.test(password)) strength++;
  if (/[@$!%*?&]/.test(password)) strength++;

  strengthMeter.className = "strength-meter";
  if (strength <= 1) strengthMeter.classList.add("fill-weak");
  else if (strength === 2) strengthMeter.classList.add("fill-medium");
  else if (strength >= 3) strengthMeter.classList.add("fill-strong");
}

passwordInput.addEventListener("input", () => {
  checkPasswordStrength(passwordInput.value);
});

// Form submit
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let isValid = true;

  // Email check
  if (!validateEmail(emailInput.value.trim())) {
    emailError.textContent = "Enter a valid @gmail.com email.";
    isValid = false;
  } else {
    emailError.textContent = "";
  }
  // Password check
  if (passwordInput.value.length < 6) {
    passwordError.textContent = "Password must be at least 6 characters.";
    isValid = false;
  } else {
    passwordError.textContent = "";
  }

  // If valid
  if (isValid) {
    if (rememberMe.checked) {
      localStorage.setItem("savedEmail", emailInput.value.trim());
    } else {
      localStorage.removeItem("savedEmail");
    }
    alert("Login Successful!");
    loginForm.reset();
    strengthMeter.className = "strength-meter";
  }
});
