import { db } from "../config.js";
import { doc, getDoc } from "../firestore-db.js";
import { auth } from "../config.js";
import { onAuthStateChanged } from "../auth.js";
const urlParams = new URLSearchParams(window.location.search);
const adId = urlParams.get("id");
const productContainer = document.getElementById("productContainer");


onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("Logged in user:", user);
    // yaha tum profile name / email / photo show karao
    document.getElementById("profileIcon").innerHTML = `
      <span>${user.userName || "User"}</span>
      <span>${user.email}</span>
    `;
  } else {
    // koi login nh hai
    document.getElementById("profileIcon").innerHTML = `
      <a href=".html">Login</a>
    `;
  }
});

async function getProductData() {
    if (!adId) {
        productContainer.innerHTML = `<p class='message-box invalid'>Invalid product link.</p>`;
        return;
    }

    try {
        const docRef = doc(db, "ads", adId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const foundAd = docSnap.data();

            productContainer.innerHTML = `
                 <div class="left-column">
            <div class="image-container">
                <!-- Main product image -->
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC8dYeUdgtYZf-6wapSPUzoV7_294rPk4eXg&s" alt="Product Image">
            </div>
                  <div class="info-section">
                <div class="price-row">
                    <h1 class="price">${foundAd.price}</h1>
                    
                </div>
                <div class="posted-date">${foundAd.createdAt}</div>
                <h2 class="title">${foundAd.title}</h2>

            </div>
               <div class="details-section">
                <h3 class="section-title">Details</h3>
                <div class="detail-rows">
                    <div class="detail-row">
                        <div class="label">Category</div>
                        <div class="value">${foundAd.category}</div>
                    </div>
                </div>
            </div>
            <!-- Section for description -->
            <div class="description-section">
                <h3 class="section-title">Description</h3>
                <p>${foundAd.description}</p>
            </div>
        </div>
        <div class="right-column" id="seller-info">
            <div class="seller-info-section">
                <div class="seller-info-content">
                    <div class="profile-icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user-circle-2"><path d="M18 20a6 6 0 0 0-12 0"/><circle cx="12" cy="10" r="4"/><path d="M22 12A10 10 0 0 0 12 2v0A10 10 0 0 0 2 12v0A10 10 0 0 0 12 22v0A10 10 0 0 0 22 12z"/></svg>
                    </div>
                    <!-- Seller Details -->
                    <div class="seller-details">
                        <span>Posted by</span>
                        <span>${foundAd.sellerName}</span>
                    </div>
                </div>
                <!-- Arrow for more details -->
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
            </div>

            <!-- Member and Active Ads Info -->
            <div class="member-ads-section">
                <div class="member-ads-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar-days"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/><path d="M8 14h.01"/><path d="M12 14h.01"/><path d="M16 14h.01"/><path d="M8 18h.01"/><path d="M12 18h.01"/><path d="M16 18h.01"/></svg>
                    <span>Location <br><strong class="font-semibold text-gray-900">${foundAd.sellerCity}</strong></span>
                </div>
                <div class="member-ads-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-layout-list"><rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><path d="M14 14h7"/><path d="M14 18h7"/><path d="M14 22h7"/><path d="M3 14h7"/><path d="M3 18h7"/><path d="M3 22h7"/></svg>
                    <span>Contact <br><strong class="font-semibold text-gray-900">${foundAd.sellerPhone}</strong></span>
                </div>
            </div>

            <!-- Contact Buttons -->
            <div class="contact-buttons">
                <button class="contact-button primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone-call"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/><path d="M14.05 2a9 9 0 0 1 8 7.94"/><path d="M14.05 6A5 5 0 0 1 19 10.94"/></svg>
                    <span>Contact Seller </span>
                </button>
                <button class="contact-button secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle"><path d="M7.9 20A9.32 9.32 0 0 1 12 18s.5-2 3-2c1.47 0 2.22 1.15 2.5 2"/><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    <span>Chat</span>
                </button>
            </div>
            
            <div class="ad-meta">
                <a href="#" class="ad-id-link">Ad Id: ${foundAd.userId}</a>
                <span>•</span>
                <a href="#" class="report-link">Report this ad</a>
            </div>
            
        </div>
            `;
        } else {
            productContainer.innerHTML = "<p class='message-box not-found'>Product not found.</p>";
        }
    } catch (error) {
        console.error("Error fetching product:", error);
        productContainer.innerHTML = "<p class='message-box error'>Something went wrong.</p>";
    }
}

getProductData();