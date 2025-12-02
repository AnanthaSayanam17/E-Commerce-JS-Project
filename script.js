let products = [];
let productArray = [];
let cartArray = [];
const productList = document.getElementById("productList");
const allProducts = document.getElementById("allProducts");
const mensProduct = document.getElementById("mensProduct");
const womenProduct = document.getElementById("womenProduct");
const jewelryProducts = document.getElementById("jewelryProducts");
const electronicProduct = document.getElementById("electronicProduct");

async function displayProducts(productArray) {
  productList.innerHTML = "";
  await productArray.map((product) => {
    const div = document.createElement("div");
    div.className = "col-12 col-md-6 col-lg-4 d-flex";
    div.innerHTML = `
      
      <div class="card shadow-lg p-3">
      <img
      src="${product.image}"
      class="card-img-top img-fluid"
      alt="product"
      />
      
      <div class="card-body text-center d-flex flex-column">
      <h5 class="card-title">${product.title}</h5>
      
      <p class="card-text flex-grow-1">
      ${product.description}
      </p>
      <hr class="w-100 my-1" />
      <div class="my-1">
      <span id="price">$${product.price}</span>
      </div>
      <hr class="w-100 my-1" />
      
      <div class="d-flex justify-content-center gap-2 mt-3">
       <button class="details-btn btn btn-dark btn-sm py-2 px-3">Details</button>
      <button class="add-btn btn btn-dark btn-sm py-2 px-3">Add to Cart</button>
      </div>
      </div>
      </div>
      `;

    productList.appendChild(div);
  });
}

async function filterProducts(category) {
  productArray = products.filter((product) => {
    return product.category === category;
  });
}

async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    return res.json();
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  showSkeleton(8);

  products = await getProducts();
  await displayProducts(products);

  hideSkeleton();
}

main();

allProducts.addEventListener("click", async () => {
  showSkeleton(8);
  await displayProducts(products);
  hideSkeleton();
});

mensProduct.addEventListener("click", async () => {
  showSkeleton(6);
  await filterProducts(`men's clothing`);
  await displayProducts(productArray);
  hideSkeleton();
});

womenProduct.addEventListener("click", async () => {
  showSkeleton(6);
  await filterProducts(`women's clothing`);
  await displayProducts(productArray);
  hideSkeleton();
});

jewelryProducts.addEventListener("click", async () => {
  showSkeleton(6);
  await filterProducts(`jewelery`);
  await displayProducts(productArray);
  hideSkeleton();
});

electronicProduct.addEventListener("click", async () => {
  showSkeleton(6);
  await filterProducts(`electronics`);
  await displayProducts(productArray);
  hideSkeleton();
});

function createSkeletonCard() {
  return `
    <div class="col-12 col-md-6 col-lg-4">
      <div class="card shadow-lg p-3">
        <div class="placeholder-glow">
          <div class="placeholder col-12 mb-3" style="height: 200px;"></div>
          <h5 class="placeholder col-8 mb-2"></h5>
          <p class="placeholder col-10 mb-1"></p>
          <p class="placeholder col-9 mb-1"></p>
          <p class="placeholder col-6 mb-1"></p>
          <hr />
          <div class="placeholder col-4 mb-3"></div>
          <hr />
          <div class="d-flex gap-2 justify-content-center">
            <button class="btn btn-dark btn-sm disabled placeholder col-4"></button>
            <button class="btn btn-dark btn-sm disabled placeholder col-4"></button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function showSkeleton(count) {
  const loader = document.getElementById("loader");
  loader.innerHTML = "";

  for (let i = 0; i < count; i++) {
    loader.innerHTML += createSkeletonCard();
  }

  loader.classList.remove("d-none");
  productList.classList.add("d-none");
}

function hideSkeleton() {
  document.getElementById("loader").classList.add("d-none");
  productList.classList.remove("d-none");
}

productList.addEventListener("click", (e) => {
  if (e.target.classList.contains("add-btn")) {
    const card = e.target.closest(".card");
    const title = card.querySelector(".card-title").textContent;
    const image = card.querySelector(".card-img-top").src;
    const price = card.querySelector("#price").textContent;
    card.querySelector(".add-btn").innerHTML = "Added to Cart";
    cartArray = JSON.parse(sessionStorage.getItem("cartArray")) || [];

    const toastEl = document.getElementById("cartToast");
    const toast = new bootstrap.Toast(toastEl, {
      delay: 1000,
      autohide: true,
    });
    toast.show();

    const existingProduct = cartArray.find(
      (product) => product.title === title
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      const newObj = {
        image: image,
        title: title,
        price: price,
        quantity: 1,
      };
      cartArray.push(newObj);
    }
    sessionStorage.setItem("cartArray", JSON.stringify(cartArray));
  }
});
