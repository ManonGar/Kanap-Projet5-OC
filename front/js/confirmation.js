let newUrl = new URL(document.location);
let search_params = new URLSearchParams(newUrl.search); 
let orderId = search_params.get("id");

document.getElementById("orderId").innerHTML = orderId;