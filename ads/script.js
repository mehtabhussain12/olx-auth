import { db } from "../config.js";
import { collection, addDoc,  } from "../firestore-db.js"; 
import { auth} from "../config.js";

const itemTitle = document.getElementById("itemTitle");
const itemCategory = document.getElementById("itemCategory");
const itemPrice = document.getElementById("itemPrice");
const itemDescription = document.getElementById("itemDescription");
const sellerName = document.getElementById("sellerName");
const sellerPhone = document.getElementById("sellerPhone");
const sellerCity = document.getElementById("sellerCity");

const submitBtn = document.getElementById("submitBtn");



// Ad post function
async function postAd(event) {
    event.preventDefault();

    const title = itemTitle.value
    const category = itemCategory.value;
    const price = itemPrice.value;
    const description = itemDescription.value;
  const sName = sellerName.value
    const sPhone = sellerPhone.value
    const sCity = sellerCity.value
    if (!title || !category || !price || !description || !sName || !sPhone || !sCity) {
        alert("Please fill all fields.");
        return;
    }
const user = auth.currentUser;
if (!user) {
    alert("Please login first!");
    return;
}

    try {
        await addDoc(collection(db, "ads"), {
            title,
            category,
            price,
            description,
              sellerName: sName,
            sellerPhone: sPhone,
            sellerCity: sCity,
            userId: user.uid,
            userEmail: user.email,
            createdAt: new Date()
        });

        alert("Ad posted successfully!");
        console.log("Ad posted:", title, category, price, description);

    } catch (error) {
        console.error("Error posting ad:", error);
    }
}

submitBtn.addEventListener("click", postAd);