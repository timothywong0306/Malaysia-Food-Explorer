window.onload = function() {

  // Update header dropdown
  if (sessionStorage.getItem("login") === "true") {
    const username = sessionStorage.getItem("username");
    document.getElementById("userprofile").innerHTML = username;
    document.getElementById("userdrop1").innerHTML = "Profile";
    document.getElementById("userdrop2").innerHTML = "Sign Out";
  } else {
    document.getElementById("userprofile").innerHTML = "Login/Sign Up";
    document.getElementById("userdrop1").innerHTML = "Login";
    document.getElementById("userdrop2").innerHTML = "Sign Up";
  }

 // Get current logged-in email
  const currentEmail = sessionStorage.getItem("email") || localStorage.getItem("email");

  // Load users array from localStorage
  let users = JSON.parse(localStorage.getItem("users") || "[]");

  // Find current user object
  let currentUser = users.find(user => user.email === currentEmail);

  if (!currentUser) return; // safety check

  // Pre-fill profile form
  document.getElementById("profileUsername").value = currentUser.username;
  document.getElementById("profileEmail").value = currentUser.email;

  document.getElementById("changePasswordForm").addEventListener("submit", function(e){
    e.preventDefault();

    const usernameInput = document.getElementById("profileUsername").value.trim();
    const oldPassword = document.getElementById("oldPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Update username if password fields are empty
    if(oldPassword === "" && newPassword === "" && confirmPassword === "") {
      if(usernameInput !== currentUser.username) {
        currentUser.username = usernameInput;
        localStorage.setItem("users", JSON.stringify(users));
        sessionStorage.setItem("username", usernameInput);
        localStorage.setItem("username", usernameInput); // if Remember Me is used
        document.getElementById("userprofile").innerHTML = usernameInput;
        alert("User profile updated successfully!");
      }
      return;
    }

    // Password update logic
    if(oldPassword !== currentUser.password) {
      alert("Old password is incorrect!");
      return;
    }

    if(newPassword !== confirmPassword) {
      alert("New password and confirm password do not match!");
      return;
    }

     if(usernameInput !== currentUser.username) {
        currentUser.username = usernameInput;
        localStorage.setItem("users", JSON.stringify(users));
        sessionStorage.setItem("username", usernameInput);
        localStorage.setItem("username", usernameInput); // if Remember Me is used
        document.getElementById("userprofile").innerHTML = usernameInput;
      }

    // Update password in users array
    currentUser.password = newPassword;
    localStorage.setItem("users", JSON.stringify(users));

    // Update session/local storage
    sessionStorage.setItem("password", newPassword);
    localStorage.setItem("password", newPassword); // if Remember Me is used

    alert("User profile updated successfully!");

    // Clear password fields
    document.getElementById("oldPassword").value = "";
    document.getElementById("newPassword").value = "";
    document.getElementById("confirmPassword").value = "";
  });
};

function setCookie(name, value, days) {
  const d = new Date();
  d.setTime(d.getTime() + (days*24*60*60*1000));
  document.cookie = name + "=" + encodeURIComponent(value) + ";expires=" + d.toUTCString() + ";path=/";
}

function getCookie(name) {
  const cname = name + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i].trim();
    if (c.indexOf(cname) === 0) return c.substring(cname.length, c.length);
  }
  return "";
}

function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

document.getElementById("userdrop2").addEventListener("click", function(e){
  if(this.textContent === "Sign Out"){
    e.preventDefault();
    // Clear session and local storage
    sessionStorage.clear();
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("username");
    localStorage.setItem("rememberMe", "false");

    // Redirect to login page
    window.location.href = "login.html";
  }

  if(this.textContent === "Sign Up"){
    window.location.href = "signup.html";
  }
});

document.getElementById("userdrop1").addEventListener("click", function(e){
  if(this.textContent === "Login"){
    window.location.href = "login.html";
  }

  if(this.textContent === "Profile"){
    window.location.href = "profile.html";
  }
});