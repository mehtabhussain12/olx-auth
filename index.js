 document.getElementById("registerModal").style.display = "none";
document.getElementById("loginModal").style.display = "none";

loginbtn = document.getElementById("loginBtn")

function openLogin() {
    document.getElementById("loginModal").style.display = "block";
}
function closeLogin() {
    document.getElementById("loginModal").style.display = "none";
}
function openRegister() {
    document.getElementById("loginModal").style.display = "none";
    document.getElementById("registerModal").style.display = "block";
}
function closeRegister() {
    document.getElementById("registerModal").style.display = "none";
}

window.onclick = function (event) {
    if (event.target === document.getElementById("loginModal")) {
        closeLogin();
    }
    if (event.target === document.getElementById("registerModal")) {
        closeRegister();
    }
};


class Person {
    fullName
    email
    password
    constructor(fullName, email, password) {
        this.fullName = fullName;
        this.email = email;
        this.password = password
    }
}

let users = JSON.parse(localStorage.getItem("users")) || [];


function RegisterForm(event) {
    event.preventDefault();
    let fullName = document.getElementById("new-username").value
    let email = document.getElementById("new-email").value
    let password = document.getElementById("new-password").value
   let exists = users.find((element) => element.email === email);
  if (exists) {
    alert("User already exists");
    return;
  }
    let newUser = new Person(fullName, email, password);
  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));
  alert("Registration successful!");
   fullName.value = ""
    email.value = ""
    password.value = ""
  closeRegister();
  loginbtn.innerHTML= savedUser.email


}
function LoginForm(event) {
  event.preventDefault();
  let email = document.getElementById("email").value
  let password = document.getElementById("password").value

  let usersFromStorage = JSON.parse(localStorage.getItem("users")) || [];
  let savedUser = usersFromStorage.find((element) => element.email === email);

  if (savedUser && savedUser.password === password) {
    alert("Login successful!");
    localStorage.setItem("loggedinUser", JSON.stringify(savedUser));
    closeLogin();
  } else {
    alert("Invalid email or password");
  }
  loginbtn.innerHTML= savedUser.fullName
}

async function getProducts() {
    let response = await fetch('https://dummyjson.com/products')
    let data = await response.json()
    console.log(data.products);


    let { products } = data;
    let cards = document.getElementById('cards');
    products.map(products => {
        let { title, price, images, id, description } = products;
        cards.innerHTML += `
          <div class="product-card">
            <div class="product-card__image">
                <img src="${images[0]}" alt="${title}">
            </div>
            <div class="product-card__info">
                <h2 class="product-card__title"><a href="./product-detail/index.html?id=${id}" target="_blank">${title}</a></h2>
                <p class="product-card__description"></p>
                <div class="product-card__price-row">
                    <span class="product-card__price">${price}</span>
                    <button class="product-card__btn">Add to Cart</button>
                </div>
            </div>
        </div>`
    ;

    });
}
getProducts();