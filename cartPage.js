const cartArray = JSON.parse(sessionStorage.getItem("cartArray")) || [];
const parent = document.getElementById("parent");
const totalBill = document.querySelector(".totalBill");
const finalBill = document.querySelector(".finalBill");
const orderSummary = document.getElementById("orderSummary");

let total = 0;

function orderDetails() {
  if (cartArray.length === 0) {
    orderSummary.style.display = "none";
  } else {
    orderSummary.style.display = "block";
  }
}

function orderTotal() {
  let total = cartArray.reduce((sum, cur) => {
    const price = Number(cur.price.replace("$", ""));
    return sum + price * cur.quantity;
  }, 0);
  total = Math.trunc(total);
  totalBill.innerHTML = `$${total}`;
  finalBill.innerHTML = `$${total + 30}`;
}

async function displayCart() {
  parent.innerHTML = "";

  if (!cartArray.length) {
    parent.parentElement.classList.toggle("col-lg-12");
    parent.innerHTML = `<div class="empty-cart-section d-flex justify-content-center align-items-center text-center w-100" style="min-height: 60vh;">
    <div>
        <h1 class="fw-bold display-4 mb-4">Your Cart is Empty</h1>

        <a href="index.html" 
           class="btn btn-outline-dark 
                  px-3 py-2 
                  px-md-5 py-md-3 
                  fs-6 fs-md-4 
                  rounded-3">
            <i class="fa-solid fa-arrow-left"></i> Continue Shopping
        </a>
    </div>
</div>


`;
    return;
  }
  cartArray.map((product, index) => {
    const div = document.createElement("div");

    div.innerHTML = `<div class="parent p-3 mx-2 mx-lg-4">
              <div
                class="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3"
              >
            <div class="d-flex align-items-center justify-content-center bg-light rounded shadow-sm" style="width:14rem; height:14rem; overflow:hidden;">
                <img
                src="${product.image}"
                alt="Product"
                class="img-fluid"
                style="max-width:100%; max-height:100%;"
                />
            </div>

                <div>
                  <p class="productTitle fw-bold mb-1">${product.title}</p>
                </div>

                <div class="d-flex flex-column align-items-center gap-3">
                  <div class="d-flex align-items-center gap-3">
                    <button class="dec btn btn-outline-dark btn-lg">-</button>
                    <div class="fw-bold px-3">${product.quantity}</div>
                    <button class="inc btn btn-outline-dark btn-lg">+</button>
                  </div>
                  <div class="fw-semibold">${product.quantity} x ${
      product.price
    }</div>
                </div>
              </div>
            </div>
            ${index !== cartArray.length - 1 ? '<hr class="mx-3" />' : ""}`;

    parent.append(div);
  });
}

displayCart();
orderTotal();
orderDetails();

parent.addEventListener("click", (e) => {
  if (e.target.classList.contains("inc")) {
    const div = e.target.closest(".parent");
    const title = div.querySelector(".productTitle").textContent;
    cartArray.map((product) => {
      if (product.title === title) {
        product.quantity += 1;
        displayCart();
        orderTotal();
        orderDetails();
      }
    });
  }
  if (e.target.classList.contains("dec")) {
    const div = e.target.closest(".parent");
    const title = div.querySelector(".productTitle").textContent;
    cartArray.map((product, index) => {
      if (product.title === title) {
        product.quantity -= 1;
        if (product.quantity <= 0) {
          cartArray.splice(index, 1);
        }
        sessionStorage.setItem("cartArray", JSON.stringify(cartArray));
        displayCart();
        orderTotal();
        orderDetails();
      }
    });
  }
});
