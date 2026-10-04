const cart=[];
const menu=[
    {name:"Samosa", price:10},
    {name:"Chole Bhature", price:50},
    {name:"Raj Kachori", price:30},
    {name:"Thali", price:100}];
    
const cartContainer = document.getElementById("cart-container");
const cartTotal=document.getElementById("cart-total");
function addToCart(food){
    let found=false;
    for (let i=0; i<cart.length; i++){
        if(cart[i].name === food.name){
            found=true;
            cart[i].quantity++;
        }
    }
    if (!found){
        cart.push({...food, quantity: 1});
    }

   
    console.log(cart);
    let carttext="";
    let total=0;
    for(let i=0;i<cart.length;i++){
        console.log(cart[i].name);
        console.log(cart[i].price);
        let subtotal = cart[i].price * cart[i].quantity;
         total += subtotal;
        carttext += `${cart[i].name} - ₹${cart[i].price} x ${cart[i].quantity} = ₹${subtotal}
                     <button data-index="${i}">-</button><br>`;
    }
    cartContainer.innerHTML=carttext;
    const minusButtons = document.querySelectorAll("[data-index]");
    console.log(minusButtons);
    for (let i=0; i<minusButtons.length; i++) {
        minusButtons[i].addEventListener("click", function() {
            let index=minusButtons[i].dataset.index;
            console.log(index);
            cart[index].quantity--;;
        });
    }
}
function calculateTotal(){
    let total=0;
    for(let i=0;i<cart.length;i++){
        total += cart[i].price * cart[i].quantity;
    }
    cartTotal.innerHTML=`Total: ₹${total}`;
}

const buttons=document.querySelectorAll(".add-to-cart");
console.log(buttons);
for(let i=0; i<buttons.length; i++){
    buttons[i].addEventListener("click", function() {
        addToCart(menu[i]);
    });
}
const totalButton=document.getElementById("calculate-total");
totalButton.addEventListener("click",function(){
    calculateTotal();
});