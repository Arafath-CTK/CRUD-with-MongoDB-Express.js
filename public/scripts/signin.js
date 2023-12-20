function validateForm() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // Advanced validation checks
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
    document.getElementById("emailError").innerHTML = "*Enter a valid mail id";
    return false;
  } else {
    document.getElementById("emailError").innerHTML = "";
  }

  if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password)) {
    document.getElementById("passwordError").innerHTML =
      "*Password must be 6-20 long<br>contain at least one digit<br>one lowercase letter<br>and one uppercase letter";
    return false;
  } else {
    document.getElementById("passwordError").innerHTML = "";
  }

  // Form is valid, allow submission
  return true;
}
