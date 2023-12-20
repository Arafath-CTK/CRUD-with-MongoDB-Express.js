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
  alert(
    "Placeholder: Save changes with new username: " +
      newUsername +
      ", new email: " +
      newEmail +
      ", old password: " +
      oldPassword +
      ", and new password: " +
      newPassword
  );
}
function deleteAccount() {
  alert("Placeholder: Delete user account.");
}
