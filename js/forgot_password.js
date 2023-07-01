document.addEventListener("DOMContentLoaded", function() {
    // Get the modal for setting new password
    const setNewPasswordModal = document.getElementById("setNewPasswordModal");
  
    // Get the close button inside the modal
    const closeButton = setNewPasswordModal.querySelector(".close");
  
    // Show the modal when the "Get Your Password" button is clicked
    const getPasswordButton = document.getElementById("getPassword");
    getPasswordButton.addEventListener("click", function(event) {
      event.preventDefault();
  
      // Get the entered email value
      const email = document.getElementById("email").value;

      if (email.trim() === "") {
        alert("Please enter a email");
        return;
      }
  
      // Retrieve stored user data from local storage
      const storedData = localStorage.getItem("formData");
      if (!storedData) {
        alert("User not registered. Please register first.");
        return;
      }
  
      const formDataArray = JSON.parse(storedData);
  
      // Check if the entered email exists in the stored data
      const user = formDataArray.find(userData => userData.email === email);
      if (!user) {
        alert("User not registered. Please register first.");
        return;
      }
  
      // Show the modal for setting new password
      setNewPasswordModal.style.display = "block";
  
      // Set the email and user index as data attributes on the form
      const setNewPasswordForm = document.getElementById("setNewPasswordForm");
      setNewPasswordForm.setAttribute("data-email", email);
      setNewPasswordForm.setAttribute("data-index", formDataArray.indexOf(user));
    });
  
    // Close the modal when the close button is clicked
    closeButton.addEventListener("click", function() {
      setNewPasswordModal.style.display = "none";
    });
  
    // Close the modal when the user clicks outside of it
    window.addEventListener("click", function(event) {
      if (event.target === setNewPasswordModal) {
        setNewPasswordModal.style.display = "none";
      }
    });
  
    // Handle form submission for setting new password
    const setNewPasswordForm = document.getElementById("setNewPasswordForm");
    setNewPasswordForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      // Get the entered new password and confirm password values
      const newPassword = document.getElementById("newPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;
  
      if (newPassword !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
      }
  
      // Get the email and user index from the form's data attributes
      const email = setNewPasswordForm.getAttribute("data-email");
      const userIndex = parseInt(setNewPasswordForm.getAttribute("data-index"));
  
      // Retrieve stored user data from local storage
      const storedData = localStorage.getItem("formData");
      if (!storedData) {
        alert("User not registered. Please register first.");
        return;
      }
  
      const formDataArray = JSON.parse(storedData);
  
      // Update the user's password with the new password
      formDataArray[userIndex].password = newPassword;
  
      // Update the stored data in local storage
      localStorage.setItem("formData", JSON.stringify(formDataArray));
  
      // Display a success message
      alert("Password has been updated successfully!");
  
      // Reset the form and hide the modal
      setNewPasswordForm.reset();
      setNewPasswordModal.style.display = "none";
      window.location.href = "user_login.html";
    });
  });
  