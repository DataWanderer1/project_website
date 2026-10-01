const cart=[];
const button = document.getElementById("samosa-button");
const cartContainer = document.getElementById("cart-container");
button.addEventListener("click", function() {
    cart.push("Samosa");
    console.log(cart);
    cartContainer.innerHTML=cart.join("<br>");
    
});

const choleBhatureButton = document.getElementById("chole-bhature-button");
choleBhatureButton.addEventListener("click", function() {
    cart.push("Chole Bhature");
    console.log(cart);
    cartContainer.innerHTML=cart.join("<br>");
});

const rajKachoriButton = document.getElementById("raj-kachori-button");
rajKachoriButton.addEventListener("click", function() {
    cart.push("Raj Kachori");
    console.log(cart);
    cartContainer.innerHTML=cart.join("<br>");
});

const thaliButton = document.getElementById("thali-button");
thaliButton.addEventListener("click", function() {
    cart.push("Thali");
    console.log(cart);
    cartContainer.innerHTML=cart.join("<br>");
});

