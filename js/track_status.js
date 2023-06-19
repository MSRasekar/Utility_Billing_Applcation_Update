function getApplicationStatus(event) {
    event.preventDefault();
  
    const mobileNumberInput = document.getElementById("mobileNumber");
    const mobileNumber = mobileNumberInput.value.trim();
  
    if (mobileNumber.length !== 10 || isNaN(mobileNumber)) {
      alert("Please enter a valid 10-digit mobile number.");
    } else {
      // Retrieve stored user data from local storage
      const storedData = localStorage.getItem("formData");
      if (!storedData) {
        alert("User not registered. Please register first.");
      } else {
        const formDataArray = JSON.parse(storedData);
  
        // Find the user based on the mobile number
        const user = formDataArray.find((data) => data.mobileNumber === mobileNumber);
        if (user) {
          // User found, check application status
          const applicationStatus = "inProcess";
          if (applicationStatus === "inProcess") {
            alert("Your application is in process.");
          } else if (applicationStatus === "hold") {
            alert("Your application is on hold (because of red zone area).");
          } else if (applicationStatus === "submitted") {
            alert("Your application has been submitted to the next stage. You will be notified soon.");
          }
        } else {
          alert("User not found. Please register first.");
        }
      }
    }
  }
  