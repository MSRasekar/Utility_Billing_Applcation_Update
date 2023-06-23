function validateLoginForm(event) {
  event.preventDefault(); // Prevent the default form submission

  // Get the form input values
  const username = document.querySelector('input[name="username"]').value;
  const password = document.querySelector('input[name="password"]').value;

  // Perform validation
  if (username.trim() === "") {
    alert("Please enter a username");
    return;
  }

  if (password.trim() === "") {
    alert("Please enter a password");
    return;
  }

  // Retrieve stored data from local storage
  const storedData = localStorage.getItem("formData");
  if (!storedData) {
    alert("User not registered. Please register first.");
    return;
  }

  const formDataArray = JSON.parse(storedData);

  // Find the matching user in the stored data
  const matchingUser = formDataArray.find(
    (user) => user.username === username && user.password === password
  );

  if (matchingUser) {
    // Clear the form fields
    document.querySelector('input[name="username"]').value = "";
    document.querySelector('input[name="password"]').value = "";

    // Redirect to the appropriate page based on the user role
    if (matchingUser.role === "admin") {
      // Redirect to the admin portal
      window.location.href = "admin_theme/html/admin-index.html";
    } else {
      // Redirect to the user portal
      window.location.href = "index.html";
      // Display a success message
      alert("User Login successfully!");
    }
  } else {
    alert("Invalid username or password");
  }
}
