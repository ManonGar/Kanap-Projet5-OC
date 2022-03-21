let cart = JSON.parse(localStorage.getItem("cart"));
console.log(cart);

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

async function displayCart() {
  for (e of cart) {
      const product = await GetProductById(e.id);
      console.log(product);
      const cartHtml = 
      `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
      <div class="cart__item__img">
        <img src="${product.imageUrl}" alt="${product.altTxt}">
      </div>
      <div class="cart__item__content">
        <div class="cart__item__content__description">
          <h2>${product.name}</h2>
          <p>${e.color}</p>
          <p>${e.price}€</p>
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
}

displayCart();