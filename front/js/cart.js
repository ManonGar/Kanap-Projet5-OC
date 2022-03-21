let cart = JSON.parse(localStorage.getItem("cart"));

async function GetProductById (productId) {
  return fetch("http://localhost:3000/api/products/" + productId)
    .then(function (res) {
      return res.json();
    })
    .then(function (response) {
      return response;
    })
    .catch((err) => {
      // Une erreur est survenue
      console.log("erreur");
    });
}

const GetTotalAmount = async () => {
  let quantity = document.getElementById("totalQuantity");
  // let itemQuantities = document.getElementsByClassName("itemQuantity");

  let price = document.getElementById("totalPrice");
  // let itemPrices = document.getElementsByClassName("cart__item__content__description".lastChild)
  
  let totalQuantity = 0;
  let totalPrice = 0;
  for (let i=0; i < cart.length; i++) {
    const product = await GetProductById(cart[i].id);
    totalQuantity += cart[i].quantity;
    totalPrice += cart[i].quantity * product.price;
    console.log(totalPrice);
  }
  quantity.insertAdjacentHTML('afterbegin', totalQuantity);
  price.insertAdjacentHTML('afterbegin', totalPrice);
  
}

async function displayCart() {
  for (e of cart) {
    const product = await GetProductById(e.id);
    const price = product.price * e.quantity;
    const cartHtml = 
    `<article class="cart__item" data-id="${e.id}" data-color="${e.color}">
    <div class="cart__item__img">
    <img src="${product.imageUrl}" alt="${product.altTxt}">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__description">
    <h2>${product.name}</h2>
    <p>${e.color}</p>
    <p>${price}€</p>
    </div>
    <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
    <p>Qté : ${e.quantity}</p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${e.quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
    <p class="deleteItem">Supprimer</p>
          </div>
        </div>
        </div>
        </article>`;
        document.getElementById("cart__items").insertAdjacentHTML('afterbegin', cartHtml);
      } 
  GetTotalAmount();
}
    
displayCart();
    
  
const ChangeQuantity = () => {
  let items = document.querySelector("#cart__items");
  items.addEventListener('change', (event) => {
    event.preventDefault;
    // if ( Number(event.target.value) < 0 || Number(event.target.value) == "" ){
    //   event.target.value = 0
    //   alert("Veuillez saisir un nombre d'articles entre 1 et 100")
    // } else if(Number(event.target.value > 100)) {
      //   event.target.value = 100
    //   alert("Veuillez saisir un nombre d'articles entre 1 et 100")
    // }
    
    let modifiedItem = event.target.closest("article");
    cart.forEach((item) => {
      if (item.id === modifiedItem.dataset.id && item.color === modifiedItem.dataset.color) {
        item.quantity = parseInt(event.target.value);
      }
    })
     
    localStorage.setItem("cart", JSON.stringify(cart)); // Mise à jour du panier dans le local Storage
    location.reload();
    
    // Calcule le nombre d'article et le prix total.
    GetTotalAmount();
    
  });
}

ChangeQuantity();

// const RemoveItem = () => {
//   let inputs = document.querySelector(".deleteItem");
//   inputs.addEventListener('click', (event) => {
//     event.preventDefault;
//     let deleteItem = event.target.closest("article");
//     cart = cart.filter(item => !(item.id === deleteItem.dataset.id && item.color === deleteItem.dataset.color));
//     localStorage.setItem("cart", JSON.stringify(cart)); // Mise à jour du panier dans le local Storage
//     location.reload();
//     GetTotalAmount();
//   })
// }

// RemoveItem();


