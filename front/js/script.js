const products_api = "http://localhost:3000/api/products";

/**
 * Insert all products in html 
 * 
 */
const InsertProducts = () => {
  fetch(products_api)
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(products) {
      for (let p of products) {
        const productHtml = 
        `<a href="./product.html?id=${p._id}">
          <article>
            <img src="${p.imageUrl}" alt="${p.altTxt}"/>
            <h3 class="productName"> ${p.name}</h3>
            <p class="productDescription"> ${p.description}</p>
          </article>
        </a>`;
        document.getElementById("items").insertAdjacentHTML('afterbegin', productHtml);
      } 
    })
    .catch((error) => {
      console.log(error);
    })
}

InsertProducts();