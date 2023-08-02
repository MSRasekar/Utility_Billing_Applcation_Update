// Retrieve form data from local storage
let storedData = localStorage.getItem("formData");
if (storedData) {
  // Parse the stored data from local storage
  storedData = JSON.parse(storedData);

  // Get the table body element
  const tableBody = document.querySelector(".user-table tbody");

  // Iterate over the stored data and create table rows
  storedData.forEach((data) => {
    // Create a new table row
    const newRow = document.createElement("tr");

    // Create table cells for each field and populate them with data
    const usernameCell = document.createElement("td");
    usernameCell.textContent = data.username;
    newRow.appendChild(usernameCell);

    const emailCell = document.createElement("td");
    emailCell.textContent = data.email;
    newRow.appendChild(emailCell);

    const mobileNumberCell = document.createElement("td");
    mobileNumberCell.textContent = data.mobileNumber;
    newRow.appendChild(mobileNumberCell);

    const genderCell = document.createElement("td");
    genderCell.textContent = data.gender;
    newRow.appendChild(genderCell);

    const addressCell = document.createElement("td");
    addressCell.textContent = data.address;
    newRow.appendChild(addressCell);

    const cityCell = document.createElement("td");
    cityCell.textContent = data.city;
    newRow.appendChild(cityCell);

    const stateCell = document.createElement("td");
    stateCell.textContent = data.state;
    newRow.appendChild(stateCell);

    const dobCell = document.createElement("td");
    dobCell.textContent = data.dob;
    newRow.appendChild(dobCell);

    const maritalStatusCell = document.createElement("td");
    maritalStatusCell.textContent = data.maritalStatus;
    newRow.appendChild(maritalStatusCell);

    const loadCell = document.createElement("td");
    loadCell.textContent = data.load;
    newRow.appendChild(loadCell);

    const connectionTypeCell = document.createElement("td");
    connectionTypeCell.textContent = data.connectionType;
    newRow.appendChild(connectionTypeCell);

    // Append the new row to the table body
    tableBody.appendChild(newRow);
  });

  const loggedInUser = storedData[2].username;
  // Create a div for admin name
  const adminNameDiv = document.createElement("div");
  adminNameDiv.classList.add("admin-name", "py-4", "px-lg-4", "bg-success");
  adminNameDiv.textContent = loggedInUser;

  // Append the admin name to the navbar
  const navbarCollapse = document.querySelector("#navbarCollapse");
  navbarCollapse.appendChild(adminNameDiv);

  // Create a circular logout button
  const logoutButton = document.createElement("button");
  logoutButton.classList.add(
    "btn",
    "text-dark",
    "btn-outline-warning",
    "py-3",
    "rounded-circle"
  );
  logoutButton.textContent = "Logout";

  // Add event listener to logout button
  logoutButton.addEventListener("click", () => {
    // Redirect to the home page
    window.location.href = "../../index.html";
  });

  // Append the logout button to the navbar
  navbarCollapse.appendChild(logoutButton);
}
