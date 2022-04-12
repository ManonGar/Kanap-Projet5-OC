const productsAPI = "http://localhost:3000/api/products";

/**
 * Get all products using fetch api
 * @param { String } url
 * @return { Promise }
 */ 
const fetchProducts = async (url) => {
  await fetch(url)
    .then(function(res) {
      if (res.ok) {
        return res.json();
      }
    })
    .then(function(value) {
      displayAllProducts(value);
    })
    .catch(function(error) {
      console.log(error);
    });
};

/**
 * Display all products on index page 
 * @param { Array.<Object> } products
 */
const displayAllProducts = async (products) => {
  for (let p of products) {
    const productHtml = 
    `<a href="./product.html?id=${p._id}">
      <article>
        <img src="${p.imageUrl}" alt="${p.altTxt}"/>
        <h3 class="productName">${p.name}</h3>
        <p class="productDescription">${p.description}</p>
      </article>
    </a>`;
    document.getElementById("items").insertAdjacentHTML('afterbegin', productHtml);
  }  
}

fetchProducts(productsAPI);