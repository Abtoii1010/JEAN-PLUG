console.log("Hello");
let cartItems = document.getElementById("cart-items");
let total = document.getElementById("total");
let clear = document.getElementById("clear");

console.log(JSON.parse(localStorage.getItem("cart")));

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart() {
  cartItems.innerHTML = "";

  if (cart.length === 0) {
    cartItems.innerHTML = "<h3>Your cart is empty.</h3>";
    total.textContent = "0";
    return;
  }

  let sum = 0;

  cart.forEach((item, index) => {
    let product = document.createElement("div");

    product.innerHTML = `
      <img src="${item.image}" width="100">

      <h3>${item.name}</h3>

      <p>₦${item.price}</p>

      <button class="minus">-</button>
      <span>${item.quantity}</span>
      <button class="plus">+</button>

      <button class="remove">Remove</button>
    `;

    cartItems.appendChild(product);

    sum += item.price * item.quantity;

    product.querySelector(".plus").addEventListener("click", () => {
      item.quantity++;
      saveCart();
    });

    product.querySelector(".minus").addEventListener("click", () => {
      if (item.quantity > 1) {
        item.quantity--;
        saveCart();
      }
    });

    product.querySelector(".remove").addEventListener("click", () => {
      cart.splice(index, 1);
      saveCart();
      updateCart();
    });
  });

  total.textContent = sum.toLocaleString();
}

function updateCart() {
  let number = document.getElementById("number");

  if (number) {
    let count = cart.reduce((sum, item) => sum + item.quantity, 0);

    number.textContent = count;
  }
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
  updateCart();
}

clear.addEventListener("click", () => {
  cart = [];
  saveCart();
});

let checkout = document.getElementById("checkout");

checkout.addEventListener("click", () => {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  let message = "Hello Jean Plug! I want to place an order.\n\n";

  let total = 0;

  cart.forEach((item) => {
    let subtotal = item.price * item.quantity;

    total += subtotal;

    message += `Product: ${item.name}\n`;
    message += `Product Image: ${item.image}\n`;
    message += `Quantity: ${item.quantity}\n`;
    message += `Price: ₦${item.price.toLocaleString()}\n`;
    message += `Subtotal: ₦${subtotal.toLocaleString()}\n\n`;
  });

  message += `Total: ₦${total.toLocaleString()}`;

  let phone = "2349125391625";

  let url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
});

displayCart();
updateCart();
