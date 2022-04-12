let myCart = JSON.parse(localStorage.getItem("cart"));

/**
 * Get product with id using fetch api
 * @param { String } productId
 * @return { Promise }
 */ 
 const getProductById = async (productId) => {
  return fetch("http://localhost:3000/api/products/" + productId)
    .then(function (res) {
      return res.json();
    })
    .then(function (value) {
      return value;
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Display cart
 * @param { Array } cart
 */ 
const displayCart = async (cart) => {
  if (cart.length !== 0) {
    for (e of cart) {
      const product = await getProductById(e.id);
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
    getTotalAmount(cart);
    changeQuantity(cart);
    removeItem(cart);

  } else {
    document.getElementById("cart__items").insertAdjacentHTML('afterbegin', "Votre panier est vide");
  }
}

/**
 * Save cart and reload page
 * @param { Array } cart
 */ 
const updateCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}  

/**
 * Get and display total amount of cart
 * @param { Array } cart
 */ 
const getTotalAmount = async (cart) => {
  let totalQuantity = 0;
  let totalPrice = 0;
  for (let i=0; i < cart.length; i++) {
    const product = await getProductById(cart[i].id);
    totalQuantity += parseInt(cart[i].quantity);
    totalPrice += parseInt(cart[i].quantity * product.price);
  }
  document.getElementById("totalQuantity").insertAdjacentHTML('afterbegin', totalQuantity);
  document.getElementById("totalPrice").insertAdjacentHTML('afterbegin', totalPrice);
}

/**
 * Change items quantity in cart
 * @param { Array } cart
 */ 
const changeQuantity = (cart) => {
  const quantityInputs = document.querySelectorAll(".itemQuantity");
  quantityInputs.forEach((quantityInput) => {
    quantityInput.addEventListener('change', (event) => {
      let inputValue = event.target.value;
      let modifiedItem = event.target.closest("article");
      // Update quantity only for item with same color and id
      cart.forEach((item) => {
        if (item.id === modifiedItem.dataset.id && item.color === modifiedItem.dataset.color) {
          item.quantity = inputValue;
        }
      })
      // Check if input value is valid
      if ( inputValue <= 0 || inputValue == "" || inputValue > 100){
        alert("Veuillez saisir un nombre d'articles entre 1 et 100");
        event.preventDefault;
      } else {
        updateCart(cart);
      }
    });
  })
}

/**
 * Remove item from cart
 * @param { Array } cart
 */ 
const removeItem = (cart) => {
  const deleteButtons = document.querySelectorAll(".deleteItem");
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', (event) => {
      let deleteItem = event.target.closest("article");
      // Remove from cart only the item with same color and id
      cart = cart.filter(item => !(item.id === deleteItem.dataset.id && item.color === deleteItem.dataset.color));
      updateCart(cart);
    })
  })
}

displayCart(myCart);

//--------------Contact Form-------------------//

// Check data before submitting form

/**
 * Check if firstname is correct
 * @return { boolean }
 */ 
const checkFirstnameInput = () => {
  const firstName = document.getElementById("firstName");
  if (!/\b([A-ZÀ-ÿa-z][-,a-z. ']+[ ]*)+$/.test(firstName.value)) {
    document.getElementById("firstNameErrorMsg").innerHTML = "Le prénom n'est pas valide";
  } else {
    document.getElementById("firstNameErrorMsg").innerHTML = "";
    return true;
  }
}

/**
 * Check if lastname is correct
 * @return { boolean }
 */ 
const checkLastnameInput = () => {
  const lastName = document.getElementById("lastName");
  if (!/\b([A-Za-z][-,a-z. ']+[ ]*)+$/.test(lastName.value)) {
    document.getElementById("lastNameErrorMsg").innerHTML = "Le nom n'est pas valide";
  } else {
    document.getElementById("lastNameErrorMsg").innerHTML = "";
    return true;
  }
}

/**
 * Check if address is correct
 * @return { boolean }
 */ 
const checkAddressInput = () => {
  const address = document.getElementById("address");
  if (!/^[A-Za-z0-9\s]{5,100}$/.test(address.value)) {
    document.getElementById("addressErrorMsg").innerHTML = "L'adresse n'est pas valide";
  } else {
    document.getElementById("addressErrorMsg").innerHTML = "";
    return true;
  }
}

/**
 * Check if city is correct
 * @return { boolean }
 */ 
const checkCityInput = () => {
  const city = document.getElementById("city");
  if (!/\b([A-Za-z][-,a-z. ']+[ ]*)+$/.test(city.value)) {
    document.getElementById("cityErrorMsg").innerHTML = "La ville n'est pas valide";
  } else {
    document.getElementById("cityErrorMsg").innerHTML = "";
    return true;
  }
}

/**
 * Check if email is correct
 * @return { boolean }
 */ 
const checkEmailInput = () => {
  const email = document.getElementById("email");
  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.value)) {
    document.getElementById("emailErrorMsg").innerHTML = "L'email n'est pas valide";
  } else {
    document.getElementById("emailErrorMsg").innerHTML = "";
    return true;
  }
}

/**
 * Listen to each form input
 */ 
const checkFormInputs = () => {
  const form = document.querySelector(".cart__order__form");
  form.firstName.addEventListener('change', checkFirstnameInput);
  form.lastName.addEventListener('change', checkLastnameInput);
  form.address.addEventListener('change', checkAddressInput);
  form.city.addEventListener('change', checkCityInput);
  form.email.addEventListener('change', checkEmailInput);
}

checkFormInputs();

/**
 * Check all inputs
 * @return { functions }
 */ 
const validateForm = () => {
  const a = checkFirstnameInput();
  const b = checkLastnameInput();
  const c = checkAddressInput();
  const d = checkCityInput();
  const e = checkEmailInput();
  return (a && b && c && d && e);
}

/**
 * Post form and send order to server
 */ 
const postForm = (cart) => {
  orderBtn = document.getElementById("order");
  orderBtn.addEventListener('click', (event) => {
    if (validateForm()) {
      let productsID = [];
      for (let p of cart) {
        productsID.push(p.id);
      }
      let order = {
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
          window.location.href = `confirmation.html?id=${data.orderId}`;
          localStorage.clear();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
        event.preventDefault();
        alert("Un ou plusieurs champs sont mal renseignés.");
      }
  });
}

postForm(myCart);


