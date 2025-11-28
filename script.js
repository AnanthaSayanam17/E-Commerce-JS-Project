let products = [];
const productList = document.getElementById("productList");

async function getProducts() {
  try {
    const res = await fetch("https://fakestoreapi.com/products");
    return res.json();
  } catch (error) {
    console.log(error);
  }
}
getProducts();

async function main() {
  products = await getProducts();

  products.map((product) => {
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
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Dolorem quae optio eius modi exercitationem corrupti
                  provident...
                </p>
                <hr class="w-100 my-1" />
                <div class="my-1">
                  <span>$297</span>
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

main();
