/**
 * Get param from url with search params
 * @param { String } url
 * @param { String } param
 * @return { String }
 */
const getParamFromUrl = (url, param) => {
  let newUrl = new URL(url);
  let searchParams = new URLSearchParams(newUrl.search); 
  let paramValue = searchParams.get(param);
  return paramValue;
}

let windowUrl = window.location.href;
const productId = getParamFromUrl(windowUrl, 'id');
const productAPI = `http://localhost:3000/api/products/${productId}`;

/**
 * Get current product using fetch api
 * @param { String } url
 * @return { Promise }
 */ 
 const fetchProduct = async (url) => {
  await fetch(url)
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      displayProduct(value);
    })
    .catch(function(error) {
      console.log(error);
    })
};

/**
 * Display current product on product page
 * @param { Object } product
 */
const displayProduct = async (product) => {
  document.getElementsByClassName("item__img")[0].insertAdjacentHTML('afterbegin', `<img
          src="${product.imageUrl}"
          alt="${product.altTxt}"/>`);
  document.getElementById("title").insertAdjacentHTML('afterbegin', `${product.name} `);
  document.getElementById("price").insertAdjacentHTML('afterbegin', `${product.price} `);
  document.getElementById("description").insertAdjacentHTML('afterbegin', `${product.description} `);
  for (let c in product.colors) { 
      document.getElementById("colors").insertAdjacentHTML('beforeend', `<option value="${product.colors[c]}">${product.colors[c]}</option>`)
  }
}

/**
 * Check if a color has been entered by user
 * @param { String } color
 * @return { boolean }
 */
const colorValid = (color) => {
  if (color === "") {
    alert("Veuillez sélectionner une couleur");
  } else {
    return true;
  }
}

/**
 * Check if quantity entered is between 1 and 100
 * @param { String } quantity
 * @return { boolean }
 */
const quantityValid = (quantity) => {
  if (quantity == 0 || quantity == "" || quantity > 100) {
    alert("Veuillez choisir une quantité comprise entre 1 et 100");
  } else {
    return true;
  }
}

/**
 * Save cart in local storage
 * @param { Array.<Object> } cart
 */
const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
}

/**
 * Check if a product with same color and id is already in cart
 * @param { Array.<Object> } cart
 */
const checkCart = (item, cart) => {
   // If cart exists we look for identical product (same color and id)
  if (cart) {
    let findItem = cart.find((element) => element.id === item.id && element.color === item.color);
    // If we find identical product, we increment quantity
    if (findItem) {
      let newQuantity = parseInt(item.quantity) + parseInt(findItem.quantity);
      findItem.quantity = newQuantity;
      saveCart(cart);
    // If product is not already in cart we add it to cart
    } else {
      cart.push(item);
      saveCart(cart);
    }
  } else {
      let cart = [];
      cart.push(item);
      saveCart(cart);
    } 
}

/**
 * Redirect to cart page 
 */
const redirectToCart = () => {
  window.location.href = "cart.html"
}

/**
 * Add item to cart
 */
const addToCart = () => {
  let myItem = {
    id: productId,
    color: document.getElementById("colors").value,
    quantity: document.getElementById("quantity").value,
  }
  const myCart = JSON.parse(localStorage.getItem("cart"));
  
  if (colorValid(myItem.color) && quantityValid(myItem.quantity)) {
    checkCart(myItem, myCart);
    redirectToCart();
  }
}

fetchProduct(productAPI);
const addBtn = document.getElementById("addToCart");
addBtn.addEventListener('click', addToCart);


  