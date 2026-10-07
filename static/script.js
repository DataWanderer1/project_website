const cartContainer = document.getElementById("cart-container");
const cartTotal=document.getElementById("cart-total");
const cart=[];
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
    rendercart();
}
function calculateTotal(){
    let total=0;
    for (let i=0; i<cart.length; i++){
        total += cart[i].price * cart[i].quantity;
    }
    return total;
}
function rendercart(){
     let carttext="";
    let total=calculateTotal();
    if (cart.length===0) {
        carttext="Your cart is empty.";
    }
    for(let i=0;i<cart.length;i++){
        console.log(cart[i].name);
        console.log(cart[i].price);
        carttext += `<div class="cart-item"> 
                            <span>${cart[i].name} - ₹${cart[i].price} x ${cart[i].quantity} = ₹${cart[i].price * cart[i].quantity}</span>
                                <div class="quantity-buttons">
                                     <button data-minus-index="${i}">-</button>
                                     <button data-plus-index="${i}">+</button>
                                </div>
                     </div>
    `;
    }               
    cartContainer.innerHTML=carttext;
    cartTotal.innerHTML=`Total: ₹${total}`;
    const minusButtons = document.querySelectorAll("[data-minus-index]");
    console.log(minusButtons);
    for (let i=0; i<minusButtons.length; i++) {
        minusButtons[i].addEventListener("click", function() {
            let index=minusButtons[i].dataset.minusIndex;
            console.log(index);
            if (cart[index].quantity >1){
                cart[index].quantity--;
            } else {
                 cart.splice(index,1);
            }
            rendercart();
        });
    }

    const plusButtons=document.querySelectorAll("[data-plus-index]");
    console.log(plusButtons);
    for (let i=0; i<plusButtons.length; i++) {
        plusButtons[i].addEventListener("click", function(){
            let index=plusButtons[i].dataset.plusIndex;
            console.log(index);
            cart[index].quantity++;
            rendercart();

        })

    }
}

const buttons=document.querySelectorAll(".add-to-cart");
console.log(buttons);
for(let i=0; i<buttons.length; i++){
    buttons[i].addEventListener("click", function() {
        const food={
            name: buttons[i].dataset.name,
            price: Number(buttons[i].dataset.price)
        };
        addToCart(food);
    });
}

const clearcartbutton=document.getElementById("clear-cart");
clearcartbutton.addEventListener("click",function() {
    cart.splice(0,cart.length);
    rendercart();
})
const checkoutSection=document.getElementById("checkout-section");
const checkoutButton=document.getElementById("checkout-button");
checkoutButton.addEventListener("click", function(){
    console.log("checkout button clicked");
    if (cart.length===0){
        alert("Your cart is empty. Add some items before checkout.")
        return;
    }
    checkoutSection.style.display="block";
});

const orderConfirmation=document.getElementById("order-confirmation");
const placeOrderButton=document.getElementById("place-order");
placeOrderButton.addEventListener("click", function(){
    console.log("place order clicked");
    const customerName=document.getElementById("customer-name");
    const customerPhone=document.getElementById("customer-phone");
    const customerAddress=document.getElementById("customer-address");
    console.log(customerName.value);
    console.log(customerPhone.value);
    console.log(customerAddress.value);
    if (customerName.value==="") {
        alert("Please enter your name.")
        return;
    }
    if (!/^[A-Za-z ]+$/.test(customerName.value)) {
        alert("Please enter a valid name.");
        return;
    }
    if (customerPhone.value===""){
        alert("Please enter your phone number.")
        return;
    }
    if (!/^\d{10}$/.test(customerPhone.value)) {
        alert("Please enter a valid phone number.")
        return;
    }
    if (customerAddress.value==="") {
        alert("Please enter your address.")
        return;
    }
    orderConfirmation.innerHTML=`<h3>Order Placed Successfully!</h3><br>
    <p>Thank you, ${customerName.value}.<br>
    Your total is ₹${calculateTotal()}.</p>`;
    cart.splice(0,cart.length);
    rendercart();

    customerName.value="";
    customerPhone.value="";
    customerAddress.value="";
    checkoutSection.style.display="none";
});
