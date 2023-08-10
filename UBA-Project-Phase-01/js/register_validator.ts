interface UserData {
    role: string;
    username: string;
    email: string;
    password: string;
    mobileNumber: string;
    gender: string;
    state: string;
    city: string;
    address: string;
    dob: string;
    maritalStatus: string;
    load: string;
    connectionType: string;
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form") as HTMLFormElement;
  
    form.addEventListener("submit", function (event: Event) {
      event.preventDefault();
  
      const usernameInput = document.getElementById("username") as HTMLInputElement;
      const cityInput = document.getElementById("city") as HTMLInputElement;
      const stateInput = document.getElementById("State") as HTMLInputElement;
      const mobileNumberInput = document.getElementById("mobileNumber") as HTMLInputElement;
      const dobInput = document.getElementById("dob") as HTMLInputElement;
      const passwordInput = document.getElementById("password") as HTMLInputElement;
      const emailInput = document.getElementById("email") as HTMLInputElement;
      const genderInput = document.getElementById("gender") as HTMLInputElement;
      const addressInput = document.getElementById("address") as HTMLInputElement;
      const maritalStatusInput = document.getElementById("marital-status") as HTMLInputElement;
      const loadInput = document.getElementById("load") as HTMLInputElement;
      const connectionTypeInput = document.getElementById("connection-type") as HTMLInputElement;
      
      const username = usernameInput.value;
      const city = cityInput.value;
      const state = stateInput.value;
      const mobileNumber = mobileNumberInput.value;
      const dob = dobInput.value;
      const password = passwordInput.value;
      const email = emailInput.value;
      const gender = genderInput.value;
      const address = addressInput.value;
      const maritalStatus = maritalStatusInput.value;
      const load = loadInput.value;
      const connectionType = connectionTypeInput.value;
  
      // ... Validation and other code ...
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

  
      // Create an object to store the user data
      const userData: UserData = {
        role: "user",
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
    let storedData: UserData[] = JSON.parse(localStorage.getItem("formData") || "[]");
    
    // Append the new form data to the existing array
    storedData.push(userData);

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
  