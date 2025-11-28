let products = [];
let productArray = [];
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
      <span>$${product.price}</span>
      </div>
      <hr class="w-100 my-1" />
      
      <div class="d-flex justify-content-center gap-2 mt-3">
      <a href="#" class="btn btn-dark btn-sm py-2 px-3">Details</a>
      <a href="#" class="btn btn-dark btn-sm py-2 px-3"
      >Add to Cart</a
      >
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
  products = await getProducts();
  await displayProducts(products);
}

main();

allProducts.addEventListener("click", async () => {
  await displayProducts(products);
});

mensProduct.addEventListener("click", async () => {
  await filterProducts(`men's clothing`);
  await displayProducts(productArray);
});

womenProduct.addEventListener("click", async () => {
  await filterProducts(`women's clothing`);
  await displayProducts(productArray);
});

jewelryProducts.addEventListener("click", async () => {
  await filterProducts(`jewelery`);
  await displayProducts(productArray);
});

electronicProduct.addEventListener("click", async () => {
  await filterProducts(`electronics`);
  await displayProducts(productArray);
});
