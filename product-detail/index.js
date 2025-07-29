 let productId = window.location.search
let id = productId[productId.length - 1]

async function getProductData() {
   
        let response = await fetch(`https://dummyjson.com/products/${id}`);
        let data = await response.json();
        console.log(data);
        showProductData(data);
    
}

getProductData();

function showProductData(product) {
  
  let headingOne = document.getElementById('h1');
  headingOne.textContent = product.title;

  let description = document.getElementById('des');
  description.textContent = product.description;

  let priceElement = document.getElementById('price');
  priceElement.textContent = `Price: $${product.price}`;

  let imgeEl = document.getElementById('thumb-image');
  imgeEl.src = product.thumbnail; 
  let pimgeEl = document.getElementById('pimage');
  pimgeEl.src = product.images[0]; 
   let p1imgeEl = document.getElementById('p1image');
  p1imgeEl.src = product.images[0]; 
   let p2imgeEl = document.getElementById('p2image');
  p2imgeEl.src = product.images[0]; 
  let containerDiv = document.getElementById("container");
  containerDiv.appendChild(priceElement);
}

