const imageInput = document.getElementById("file-input");
const imageHolder = document.getElementById("image-holder");
const uploadImage = document.querySelector(".upload-icon");

const fullName = document.getElementById("fullName");
const emailId = document.getElementById("email");
const githubUserName = document.getElementById("github");
const uploadForm = document.getElementById("registrationForm");

const formContainer = document.getElementById("registration-form");
const successContainer = document.querySelector(".success-container");

let uploadedImageData = null;

// Handle image preview
imageInput.addEventListener("change", function (e) {
  const file = this.files[0];

  if (file) {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e) {
      uploadedImageData = e.target.result; // store image data
      imageHolder.style.display = "inline-flex";
      imageHolder.src = uploadedImageData;
      uploadImage.style.display = "none";
    };
    reader.readAsDataURL(file);
  }
});

// Validate email format
function isValidEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

uploadForm.addEventListener("submit", function (e) {
  e.preventDefault();

  let errors = [];

  // Check avatar
  if (!uploadedImageData) {
    errors.push("Please upload a valid avatar image.");
  }

  // Validate name
  if (fullName.value.trim() === "") {
    errors.push("Full Name is required.");
  }

  // Validate email
  if (emailId.value.trim() === "" || !isValidEmail(emailId.value.trim())) {
    errors.push("Enter a valid email address.");
  }

  // Validate GitHub username
  if (githubUserName.value.trim() === "") {
    errors.push("GitHub username is required.");
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return;
  }

  console.log("abb generate ticket");

  generateTicket({
    avatar: uploadedImageData,
    name: fullName.value.trim(),
    email: emailId.value.trim(),
    github: githubUserName.value.trim()
  });
});


function generateTicket({ avatar, name, email, github }) {
    document.getElementById("userName").innerText = name;
  document.getElementById("userEmail").innerText = email;
  document.getElementById("ticketName").innerText = name;
  document.getElementById("ticketGithub").innerText = `@${github}`;
  document.getElementById("ticketAvatar").src = avatar;

  formContainer.style.display = 'none';
    successContainer.style.display = 'block';
  }
  