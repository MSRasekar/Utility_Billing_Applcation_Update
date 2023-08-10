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
  
  enum ApplicationStatus {
    InProcess = "inProcess",
    Hold = "hold",
    Submitted = "submitted",
  }
  
  function getApplicationStatus(event: Event): void {
    event.preventDefault();
  
    const mobileNumberInput = document.getElementById("mobileNumber") as HTMLInputElement;
    const mobileNumber = mobileNumberInput.value.trim();
  
    if (mobileNumber.length !== 10 || isNaN(Number(mobileNumber))) {
      alert("Please enter a valid 10-digit mobile number.");
    } else {
      // Retrieve stored user data from local storage
      const storedData = localStorage.getItem("formData");
      if (!storedData) {
        alert("User not registered. Please register first.");
      } else {
        const formDataArray: UserData[] = JSON.parse(storedData);
  
        // Find the user based on the mobile number
        const user: UserData | undefined = formDataArray.find((data) => data.mobileNumber === mobileNumber);
        if (user) {
          // User found, check application status
          const applicationStatus: ApplicationStatus = ApplicationStatus.InProcess;
          if (applicationStatus === ApplicationStatus.InProcess) {
            alert("Your application is in process.");
          } else if (applicationStatus === ApplicationStatus.Hold) {
            alert("Your application is on hold (because of red zone area).");
          } else if (applicationStatus === ApplicationStatus.Submitted) {
            alert("Your application has been submitted to the next stage. You will be notified soon.");
          }
        } else {
          alert("User not found. Please register first.");
        }
      }
    }
  }
  