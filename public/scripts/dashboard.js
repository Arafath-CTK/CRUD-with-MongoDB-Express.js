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
  window.location.reload();
}

document
  .getElementById("updateForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);
      const encodedFormData = new URLSearchParams();

      for (const pair of formData.entries()) {
        encodedFormData.append(pair[0], encodeURIComponent(pair[1]));
      }

      if (validateForm()) {
        fetch("/update", {
          method: "PUT",
          body: encodedFormData,
          // Clicking the submit button triggers event.target to identify the form,
          // then FormData gathers submitted data, packs it into the request body as key-value pairs,
          // and sends it to the server for further processing.
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);

            if (data.success) { 
              alert(data.message);
              window.location.href = "/logout";
            } else {
              console.log(data);
              if (data.messageEmail) {
                document.getElementById("newEmailError").innerHTML =
                  data.messageEmail;
              }
              if (data.messagePassword) {
                document.getElementById("currentPasswordError").innerHTML =
                  data.messagePassword;
              }
            }
          })
          .catch((error) => {
            console.error("Error submitting form", error);
          });
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  });

function validateForm() {
  const newFullName = document.getElementById("newFullName").value;
  const newEmail = document.getElementById("newEmail").value;
  const newPassword = document.getElementById("newPassword").value;

  let isValid = true;

  if (!/^[A-Za-z\s]{3,}$/.test(newFullName)) {
    document.getElementById("newFullNameError").innerHTML =
      "Enter a valid name";
    isValid = false;
  } else {
    document.getElementById("newFullNameError").innerHTML = "";
  }
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(newEmail)) {
    document.getElementById("newEmailError").innerHTML =
      "Enter a valid email id";
    isValid = false;
  } else {
    document.getElementById("newEmailError").innerHTML = "";
  }

  if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(newPassword)) {
    document.getElementById("newPasswordError").innerHTML =
      "Password must be 6-20 long<br>contain at least one digit<br>one lowercase letter<br>and one uppercase letter";
    isValid = false;
  } else {
    document.getElementById("newPasswordError").innerHTML = "";
  }

  return isValid;
}

async function deleteAccount() {
  const confirmation = confirm("Are you sure?");

  if (confirmation) {
    try {
      const response = await fetch("/delete", {
        method: "DELETE",
      });
      const data = await response.json();

      if (data.success) {
        alert(data.message);
        window.location.href = "/";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error while deleting the account", error);
    }
  }
}
