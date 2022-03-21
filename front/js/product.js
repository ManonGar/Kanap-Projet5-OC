/**
 * Get param from window url with search params
 * @param { String } url
 * @param { String } param
 * @return { String }
 */
const GetParamFromUrl = (url, param) => {
  let newUrl = new URL(url);
  let search_params = new URLSearchParams(newUrl.search); 
  let paramValue = search_params.get(param);
  return paramValue;
}

// Get info for the current product (with param id)
let window_url = window.location.href;
const productId = GetParamFromUrl(window_url, 'id');
const id_api = `http://localhost:3000/api/products/${productId}`;

/**
 * Insert current product info in html 
 * 
 */
const InsertProduct = () => {
  fetch(id_api)
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(product) {
    document.getElementsByClassName("item__img")[0].insertAdjacentHTML('afterbegin', `<img
           src="${product.imageUrl}"
           alt="${product.altTxt}"/>`);
    document.getElementById("title").insertAdjacentHTML('afterbegin', `${product.name} `);
    document.getElementById("price").insertAdjacentHTML('afterbegin', `${product.price} `);
    document.getElementById("description").insertAdjacentHTML('afterbegin', `${product.description} `);
    for (let c in product.colors) {
        document.getElementById("colors").insertAdjacentHTML('beforeend', `<option value="${product.colors[c]}">${product.colors[c]}</option>`)
    }

  });
}

InsertProduct();

  const addBtn = document.getElementById("addToCart");
  addBtn.addEventListener('click', () => {
    let item = {
      id: productId,
      color: document.getElementById("colors").value,
      quantity: document.getElementById("quantity").value,
    }
    // Initialisation local storage
    // localStorage.clear();
    const myCart = JSON.parse(localStorage.getItem("cart"));
    // console.log(myCart);
    // Si le panier n'est pas vide
    if (myCart) {
      let findItem = myCart.find((element) => element.id === item.id && element.color === item.color);
      // Si le produit choisi est déjà dans le panier
      if (findItem) {
        let newQuantity = parseInt(item.quantity) + parseInt(findItem.quantity);
        findItem.quantity = newQuantity;
        localStorage.setItem("cart", JSON.stringify(myCart));
        console.log("hi");
      // Si le produit choisi n'est pas dans le panier
      } else {
        myCart.push(item);
        localStorage.setItem("cart", JSON.stringify(myCart));
        console.log("hello");
      }
    
    // Si le panier est vide
    } else {
        let myCart = [];
        myCart.push(item);
        localStorage.setItem("cart", JSON.stringify(myCart));
        console.log("coucou");
      }
      console.log(myCart);
  })

  