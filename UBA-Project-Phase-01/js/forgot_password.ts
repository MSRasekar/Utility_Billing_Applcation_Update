document.addEventListener("DOMContentLoaded", function() {
    // Get the modal for setting new password
    const setNewPasswordModal = document.getElementById("setNewPasswordModal") as HTMLDivElement;
  
    // Get the close button inside the modal
    const closeButton = setNewPasswordModal.querySelector(".close") as HTMLButtonElement;
  
    // Show the modal when the "Get Your Password" button is clicked
    const getPasswordButton = document.getElementById("getPassword") as HTMLButtonElement;
    getPasswordButton.addEventListener("click", function(event) {
      event.preventDefault();
  
      // Get the entered email value
      const email = (document.getElementById("email") as HTMLInputElement).value;
  
      if (email.trim() === "") {
        alert("Please enter an email");
        return;
      }
  
      // Retrieve stored user data from local storage
      const storedData = localStorage.getItem("formData");
      if (!storedData) {
        alert("User not registered. Please register first.");
        return;
      }
  
      const formDataArray: UserData[] = JSON.parse(storedData);
  
      // Check if the entered email exists in the stored data
      const user = formDataArray.find(userData => userData.email === email);
      if (!user) {
        alert("User not registered. Please register first.");
        return;
      }
  
      // Show the modal for setting new password
      setNewPasswordModal.style.display = "block";
  
      // Set the email and user index as data attributes on the form
      const setNewPasswordForm = document.getElementById("setNewPasswordForm") as HTMLFormElement;
      setNewPasswordForm.setAttribute("data-email", email);
      setNewPasswordForm.setAttribute("data-index", formDataArray.indexOf(user).toString());
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
    const setNewPasswordForm = document.getElementById("setNewPasswordForm") as HTMLFormElement;
    setNewPasswordForm.addEventListener("submit", function(event) {
      event.preventDefault();
  
      // Get the entered new password and confirm password values
      const newPassword = (document.getElementById("newPassword") as HTMLInputElement).value;
      const confirmPassword = (document.getElementById("confirmPassword") as HTMLInputElement).value;
  
      if (newPassword !== confirmPassword) {
        alert("Passwords do not match. Please try again.");
        return;
      }
  
      // Get the email and user index from the form's data attributes
      const email = setNewPasswordForm.getAttribute("data-email") as string;
      const userIndex = parseInt(setNewPasswordForm.getAttribute("data-index") || "0");
  
      // Retrieve stored user data from local storage
      const storedData = localStorage.getItem("formData");
      if (!storedData) {
        alert("User not registered. Please register first.");
        return;
      }
  
      const formDataArray: UserData[] = JSON.parse(storedData);
  
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
  