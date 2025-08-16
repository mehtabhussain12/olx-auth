import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "./auth.js";
import { auth } from "./config.js";
import {db} from './config.js'
import {collection , addDoc ,setDoc, doc} from './firestore-db.js'   
const registerModal = document.getElementById("registerModal")
const loginModal = document.getElementById("loginModal")
const loginLink = document.getElementById("loginLink")
const registerLink = document.getElementById("registerLink");
const loginBtn = document.getElementById("loginBtn");
const registerForm = document.getElementById("registerForm");
const loginForm = document.getElementById("loginForm");
const profileIcon = document.getElementById("profileIcon");
const profileDropdown = document.getElementById("profileDropdown");
const userEmailDisplay = document.getElementById("userEmailDisplay");
const logoutBtn = document.getElementById("logoutBtn");
const sellButton = document.getElementById("sell-button");
sellButton.disable= true
function openLogin() {
    loginModal.style.display = "block";
}
function closeLogin() {
    loginModal.style.display = "none";
}
function openRegister() {
    loginModal.style.display = "none";
    registerModal.style.display = "block";
}
function closeRegister() {
    registerModal.style.display = "none";
}
loginBtn.addEventListener("click", openLogin);
loginLink.addEventListener("click", openLogin);
registerLink.addEventListener("click", openRegister);

// Close modal on outside click
window.addEventListener("click", function (event) {
    if (event.target === loginModal) {
        closeLogin();
    }
    if (event.target === registerModal) {
        closeRegister();
    }
});

// Register with Firebase
function RegisterForm(event) {
    console.log("hello")
    event.preventDefault();
    let email = document.getElementById("new-email").value;
    let password = document.getElementById("new-password").value;
let username = document.getElementById("new-username").value;
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        const user = userCredential.user;
        // CORRECTED CALL: Pass user.email, then username, then user.uid
        adduserTodb(user.email, username, user.uid); // <--- HERE!
        console.log("User registered:", user);
        alert("Registration successful!");
        closeRegister();
    })
        .catch((error) => {
            alert(error.message);
        });
}
async function adduserTodb(email, userName, userId) { 
    const userDocRef = doc(db, "users", userId); 
    await setDoc(userDocRef, {
        email,
        userName,
        uid: userId,
        image: 'https://images.pexels.com/photos/2486168/pexels-photo-2486168.jpeg'
    });
    console.log("User profile added to Firestore with ID: ", userId);
}
function LoginForm(event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login successful! " + userCredential.user.email);
            closeLogin();
        })
        .catch((error) => {
            alert(error.message);
        });
        if(userCredential.user.email){
          sellButton.disabled = false;
          sellButton.addEventListener("click", () => {
            console.log("clik")
            window.location.href = "./ads/ads.html";
          });
        }
}

registerForm.addEventListener("submit", RegisterForm);
loginForm.addEventListener("submit", LoginForm);
profileIcon.addEventListener("click", () => {
  profileDropdown.style.display = profileDropdown.style.display === "none" ? "block" : "none";
});


onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is logged in
    loginBtn.style.display = "none";
    profileIcon.style.display = "flex"; 
    userEmailDisplay.textContent = user.email;
    document.getElementById("profileContainer").style.display = "none";
  } else {
    // User is logged out
    loginBtn.style.display = "block";
    profileIcon.style.display = "none";
    document.getElementById("profileContainer").style.display = "none";
  }
});
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    // Logged out successfully
    console.log("User logged out");
    alert("Logout successful!");
    profileDropdown.style.display = "none";
  }).catch((error) => {
    console.error("Logout failed: ", error);
    alert(error.message);
  });
});

