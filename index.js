import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "./auth.js";
import { auth } from "./config.js";
import {db} from './config.js'
import {collection , addDoc ,setDoc, doc,  getDocs} from './firestore-db.js'   
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
const adsContainer = document.getElementById("cards");
const myAdsBtn = document.getElementById("myAdsBtn");
const profileContainer = document.getElementById("profileContainer");
// sellButton.disable= true
function openLogin() {
  registerModal.style.display = "none";
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
        
        adduserTodb(user.email, username, user.uid);
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
            if (userCredential.user.email) {
                sellButton.disabled = false;
                sellButton.addEventListener("click", () => {
                    console.log("clik");
                    window.location.href = "../ads/ads.html";
                });
            }
        })
        .catch((error) => {
            alert(error.message);
        });
       
}


registerForm.addEventListener("submit", RegisterForm);
loginForm.addEventListener("submit", LoginForm);
profileIcon.addEventListener("click", () => {
  profileDropdown.style.display = profileDropdown.style.display === "none" ? "block" : "none";
});


onAuthStateChanged(auth, (user) => {
  if (user) {
    profileContainer.innerHTML = `
        <h1>Welcome to your profile!</h1>
        
  <p id="userEmail">${user.email}</p>
  <button id="myAdsBtn">My ads</button>
  <button id="logoutBtn">Logout</button>`
    loginBtn.style.display = "none";
    profileIcon.style.display = "flex"; 
    userEmailDisplay.textContent = user.email;
    document.getElementById("profileContainer").style.display = "none";
    sellButton.disabled = false;
    sellButton.addEventListener("click", () => {
      console.log("Sell button click");
      window.location.href = "./ads/ads.html";
    });

  } else {
    loginBtn.style.display = "block";
    profileIcon.style.display = "none";
    document.getElementById("profileContainer").style.display = "none";
    sellButton.disabled = true;
  }
});
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    console.log("User logged out");
    alert("Logout successful!");
    profileDropdown.style.display = "none";
  }).catch((error) => {
    console.error("Logout failed: ", error);
    alert(error.message);
  });
});
async function fetchAllAds() {
    try {
     
    
        const querySnapshot = await getDocs(collection(db, "ads"));

        adsContainer.innerHTML = "";

        querySnapshot.forEach((doc) => {
            const ad = doc.data();
            const adId = doc.id;
            const adCard = `
                <div class="product-card">
                <div class = "product-card__info">
                <div class="product-card__image">
                <img src="https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp" alt="Essence Mascara Lash Princess">
            </div>
                  <h3><a href="./product/index.html?id=${doc.id}">${ad.title}</a></h3>
                    <p><strong>Category:</strong> ${ad.category}</p>
                       <p class= "product-card__description">${ad.description}</p>
                    <div class="product-card__price-row">
                    <span class="product-card__price">${ad.price}</span>
                    <button class="product-card__btn">Add to Cart</button>
                </div>
                 
                  
                </div>
                <div class="product-card__seller-info">
                    <p><strong>Seller Name:</strong> ${ad.sellerName}</p>
                    <p><strong>Phone:</strong> ${ad.sellerPhone}</p>
                    <p><strong>City:</strong> ${ad.sellerCity}</p>
                </div>
            `;

            adsContainer.innerHTML += adCard;
        });

    } catch (error) {
        console.error("Error fetching ads:", error);
    }
}


fetchAllAds()