// Check if user is logged in
let storedData = localStorage.getItem("formData");

if (storedData) {
  storedData = JSON.parse(storedData);

  const loggedInUser = storedData[2].username;

  console.log(loggedInUser);
  // User is logged in, update the navbar
  const signInButton = document.querySelector("#sign-button");
  

  // Create a div for admin name
  const adminNameDiv = document.createElement("div");
  adminNameDiv.classList.add("admin-name", "py-4", "px-lg-4","bg-success");
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
