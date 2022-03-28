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

const DisplayCart = async () => {
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
  ChangeQuantity();
  RemoveItem();
}
    
DisplayCart();
    
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
  }
  quantity.insertAdjacentHTML('afterbegin', totalQuantity);
  price.insertAdjacentHTML('afterbegin', totalPrice);
  
}

const ChangeQuantity = () => {
  let itemQuantity = document.querySelector(".itemQuantity");
  itemQuantity.addEventListener('change', (event) => {
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

const RemoveItem = () => {
  let inputs = document.querySelector(".deleteItem");
  inputs.addEventListener('click', (event) => {
    event.preventDefault;
    let deleteItem = event.target.closest("article");
    cart = cart.filter(item => !(item.id === deleteItem.dataset.id && item.color === deleteItem.dataset.color));
    localStorage.setItem("cart", JSON.stringify(cart)); // Mise à jour du panier dans le local Storage
    location.reload();
    GetTotalAmount();
  })
}


//Formulaire contact

// Validation des données

const errorMsg = "Format non valide";

const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

// Prénom
firstName.addEventListener("input", (event) => {
  event.preventDefault();
  if (!/^[A-Za-z\-]{3,20}$/.test(firstName.value)) {
    document.getElementById("firstNameErrorMsg").innerHTML = errorMsg;
  } else {
    document.getElementById("firstNameErrorMsg").innerHTML = "";
  }
});

// Nom
lastName.addEventListener("input", (event) => {
  event.preventDefault();
  if (!/^[A-Za-z\-]{3,20}$/.test(lastName.value)) {
    document.getElementById("lastNameErrorMsg").innerHTML = errorMsg;
  } else {
    document.getElementById("lastNameErrorMsg").innerHTML = "";
  }
});

//Adresse
address.addEventListener("input", (event) => {
  event.preventDefault();
  if (!/^[A-Za-z0-9\s]{5,100}$/.test(address.value)) {
    document.getElementById("addressErrorMsg").innerHTML = errorMsg;
  } else {
    document.getElementById("addressErrorMsg").innerHTML = "";
  }
});

//Ville
city.addEventListener("input", (event) => {
  event.preventDefault();
  if (!/^[A-Za-z\ ]{3,20}$/.test(city.value)) {
    document.getElementById("cityErrorMsg").innerHTML = errorMsg;
  } else {
    document.getElementById("cityErrorMsg").innerHTML = "";
  }
});

//Email
email.addEventListener("input", (event) => {
  event.preventDefault();
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
    document.getElementById("emailErrorMsg").innerHTML = errorMsg;
  } else {
    document.getElementById("emailErrorMsg").innerHTML = "";
  }
});

const GetData = () => {
  let form = document.querySelector(".cart__order__form");

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // if (firstName.value === "" || lastName.value === "" || address.value === "" || city.value === "" || email.value === "") {
    //   alert("Tous les champs doivent être renseignés");
    //   event.preventDefault();
    // } else if (!/^[A-Za-z\-]{3,20}$/.test(firstName.value) || !/^[A-Za-z\-]{3,20}$/.test(lastName.value) || !/^[A-Za-z0-9\s]{5,100}$/.test(address.value) || !/^[A-Za-z\ ]{3,20}$/.test(city.value) || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
    //   alert("Les champs sont mal renseignés");
    //   event.preventDefault();
    // } else {
      let productsID = [];
      for (let p of cart) {
        productsID.push(p.id);
      }
      const order = {
        contact : {
          firstName: firstName.value,
          lastName: lastName.value,
          address: address.value,
          city: city.value,
          email: email.value,
        },
        products: productsID,
      }
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify(order),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          document.location.href = `confirmation.html?id=${data.orderId}`;
          // localStorage.clear();
        })
        .catch((error) => {
          console.log("une erreur est survenue");
        });
    
  });
}

GetData();


