console.log("Shop JS is connected");

let plus = document.getElementsByClassName("plus");
let minus = document.getElementsByClassName("minus");
let number = document.getElementById("number");

Array.from(plus).forEach((button) => {
  button.addEventListener("click", () => {
    let amount = button.parentElement.querySelector(".amount");
    amount.textContent++;
  });
});

Array.from(minus).forEach((button) => {
  button.addEventListener("click", () => {
    let amount = button.parentElement.querySelector(".amount");

    if (amount.textContent > 1) {
      amount.textContent--;
    }
  });
});

let carts = document.querySelectorAll(".cart");

function updateCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  let total = 0;

  cart.forEach((item) => {
    total += item.quantity;
  });

  number.textContent = total;
}
carts.forEach((button) => {
  button.addEventListener("click", () => {
    let product = button.parentElement;

    let name = product.querySelector(".name").textContent;
    let price = Number(product.querySelector(".price").textContent);
    let image = product.querySelector("img").src;
    let amount = Number(product.querySelector(".amount").textContent);

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let existing = cart.find((item) => item.name === name);

    if (existing) {
      existing.quantity += amount;
    } else {
      cart.push({
        name: name,
        price: price,
        image: image,
        quantity: amount,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    console.log(JSON.parse(localStorage.getItem("cart")));

    alert("Added to cart!");
  });
});

window.addEventListener("pageshow", () => {
  updateCart();
});
console.log("Number of cart buttons:", carts.length);
