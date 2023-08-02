document.addEventListener("DOMContentLoaded", function () {
  // Get the form element
  const form = document.querySelector("form");

  // Add event listener for form submission
  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the form input values
    const username = document.getElementById("username").value;
    const city = document.getElementById("city").value;
    const state = document.getElementById("State").value;
    const mobileNumber = document.getElementById("mobileNumber").value;
    const dob = document.getElementById("dob").value;
    const password = document.getElementById("password").value;

    // Regular expressions for validation
    const letterRegex = /^[A-Za-z]+$/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /^[0-9]+$/;
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;

    // Check if username is valid
    if (
      username === "" ||
      !letterRegex.test(username.charAt(0)) ||
      specialCharRegex.test(username)
    ) {
      alert(
        "Username should start with a letter and cannot contain special characters."
      );
      return; // Stop form submission
    }

    // Check if password is valid
    if (
      password === "" ||
      !/(?=.*[a-z])/.test(password) || // At least one lowercase letter
      !/(?=.*[A-Z])/.test(password) || // At least one uppercase letter
      !/(?=.*\d)/.test(password) || // At least one number
      password.length < 8 // Minimum 8 characters
    ) {
      alert(
        "Password must contain at least 8 characters, including a lowercase letter, an uppercase letter, and a number."
      );
      return; // Stop form submission
    }

    // Check if mobile number is valid
    if (
      mobileNumber === "" ||
      !numberRegex.test(mobileNumber) ||
      mobileNumber.length !== 10
    ) {
      alert(
        "Mobile number should be 10 digits and cannot contain non-numeric characters."
      );
      return; // Stop form submission
    }

    // Check if state is valid
    if (state === "" || numberRegex.test(state)) {
      alert("State should not be blank and cannot contain numbers.");
      return; // Stop form submission
    }

    // Check if city is valid
    if (city === "" || numberRegex.test(city)) {
      alert("City should not be blank and cannot contain numbers.");
      return; // Stop form submission
    }

    // Check if dob is valid
    const currentDate = new Date();
    const dobDate = new Date(dob);
    const ageDiff = currentDate.getFullYear() - dobDate.getFullYear();
    const isOldEnough = ageDiff >= 18;

    if (!isOldEnough) {
      alert("You must be at least 18 years old to apply.");
      return; // Stop form submission
    }

    // Get the remaining form input values
    const role =  "user";
    const email = document.getElementById("email").value;
    const gender = document.getElementById("gender").value;
    const address = document.getElementById("address").value;
    const maritalStatus = document.getElementById("marital-status").value;
    const load = document.getElementById("load").value;
    const connectionType = document.getElementById("connection-type").value;

    // Create an object to store the form data
    const formData = {
      role : role,
      username: username,
      email: email,
      password: password,
      mobileNumber: mobileNumber,
      gender: gender,
      state: state,
      city: city,
      address: address,
      dob: dob,
      maritalStatus: maritalStatus,
      load: load,
      connectionType: connectionType,
    };

    // Check if form data exists in local storage
    let storedData = localStorage.getItem("formData");
    if (storedData) {
      // Parse the stored data from local storage
      storedData = JSON.parse(storedData);
    } else {
      // Create a new array for form data
      storedData = [];
    }

    // Append the new form data to the existing array
    storedData.push(formData);

    // Store the updated data array in local storage
    localStorage.setItem("formData", JSON.stringify(storedData));

    // Display a success message
    alert("User Registered successfully!");

    // Reset the form
    form.reset();
    // Redirect to the login form
    window.location.href = "user_login.html";
  });
});
