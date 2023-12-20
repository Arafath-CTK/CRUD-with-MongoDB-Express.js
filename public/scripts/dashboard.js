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
  var settingsModal = document.getElementById("settingsModal");
  settingsModal.style.display = "none";
}
function saveChanges() {
  var newUsername = document.getElementById("editUsername").value;
  var newEmail = document.getElementById("editEmail").value;
  var oldPassword = document.getElementById("editOldPassword").value;
  var newPassword = document.getElementById("editPassword").value;
  let errorCount = 0;

  if (!/^[A-Za-z\s]{3,}$/.test(newUsername)) {
    document.getElementById("fullnameError").innerHTML = "*Enter a valid name";
    errorCount++;
  } else {
    document.getElementById("fullnameError").innerHTML = "";
  }
  if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(newEmail)) {
    document.getElementById("emailError").innerHTML = "*Enter a valid email id";
    errorCount++;
  } else {
    document.getElementById("emailError").innerHTML = "";
  }

  if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(newPassword)) {
    document.getElementById("passwordError").innerHTML =
      "*Password must be 6-20 long<br>contain at least one digit<br>one lowercase letter<br>and one uppercase letter";
    errorCount++;
  } else {
    document.getElementById("passwordError").innerHTML = "";
  }

  if (errorCount > 0) {
    return false;
  } else {
    return true;
  }
}
function deleteAccount() {
  alert("Placeholder: Delete user account.");
}
