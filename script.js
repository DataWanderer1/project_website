const cart=[];
const food=[
    {name:"Samosa", price:10},
    {name:"Chole Bhature", price:50},
    {name:"Raj Kachori", price:30},
    {name:"Thali", price:100}];
for(let i=0; i<food.length; i++){
    console.log(food[i].name);
    console.log(food[i].price);
}
const cartContainer = document.getElementById("cart-container");
function addToCart(food){
    cart.push(food);
    console.log(cart);
    let carttext="";
    for(let i=0;i<cart.length;i++){
        console.log(cart[i].name);
        console.log(cart[i].price);
        carttext += `${cart[i].name} - ₹${cart[i].price}<br>`;
    }
    cartContainer.innerHTML=carttext;
}

const buttons=document.querySelectorAll(".add-to-cart");
console.log(buttons);
for(let i=0; i<buttons.length; i++){
    buttons[i].addEventListener("click", function() {
        addToCart(food[i]);
    });
}