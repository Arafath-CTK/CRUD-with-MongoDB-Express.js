const { response } = require("express");
const { validate } = require("../../models/user");

function openUserDetailsModal() {
  var userDetailsModal = document.getElementById("userDetailsModal");
  userDetailsModal.style.display = "flex";
}

function closeUserDetailsModal() {
  var userDetailsModal = document.getElementById("userDetailsModal");
  userDetailsModal.style.display = "none";
}

function openSettingsModal() {
  var settingsModal = document.getElementById("settingsModal");
  settingsModal.style.display = "flex";
}

function closeSettingsModal() {
  // var settingsModal = document.getElementById("settingsModal");
  // settingsModal.style.display = "none";
  window.location.href = "/dashboard";
}

function validateForm(newUsername, newEmail, newPassword) {
  let isValid = true;

  if (!/^[A-Za-z\s]{3,}$/.test(newUsername)) {
    document.getElementById("fullnameError").innerHTML = "*Enter a valid name";
    isValid = false;
  } else {
    document.getElementById("fullnameError").innerHTML = "";
  }
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(newEmail)) {
    document.getElementById("emailError").innerHTML = "*Enter a valid email id";
    isValid = false;
  } else {
    document.getElementById("emailError").innerHTML = "";
  }

  if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(newPassword)) {
    document.getElementById("passwordError").innerHTML =
      "*Password must be 6-20 long<br>contain at least one digit<br>one lowercase letter<br>and one uppercase letter";
    isValid = false;
  } else {
    document.getElementById("passwordError").innerHTML = "";
  }

  return isValid;
}

document
  .getElementById("updateForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const newUsername = document.getElementById("editUsername").value;
      const newEmail = document.getElementById("editEmail").value;
      const newPassword = document.getElementById("editPassword").value;

      const isValid = validateForm(newUsername, newEmail, newPassword);

      if (isValid) {
        const response = await fetch("/update", {
          method: "PUT",
          body: new URLSearchParams(FormData),
          // Clicking the submit button triggers event.target to identify the form,
          // then FormData gathers submitted data, packs it into the request body as key-value pairs,
          // and sends it to the server for further processing.
        });

        const data = await response.json();

        if (data.success) {
          alert(data.message);
          window.location.href = "/dashboard";
        } else {
          if (data.messageEmail) {
            document.getElementById("emailError").innerHTML = data.messageEmail;
          }
          if (data.messagePassword) {
            document.getElementById("oldPasswordError").innerHTML =
              data.messagePassword;
          }
        }
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  });

function deleteAccount() {
  alert("Placeholder: Delete user account.");
}
