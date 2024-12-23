
let cart = [];

function addProduct(productName, price, quantity) {
  cart.push({ productName, price, quantity });
  updateCartSummary();
}

function calculateTotal() {
  return cart.reduce((total, { price, quantity }) => total + price * quantity, 0).toFixed(2);
}

const removeProduct = (name) => {
  cart = cart.filter(({ productName }) => productName !== name);
  updateCartSummary();
};

function updateCartSummary() {
  const cartSummary = document.getElementById("cartSummary");
  const totalCost = document.getElementById("totalCost");
  cartSummary.innerHTML = "";

  cart.forEach(({ productName, price, quantity }) => {
    const listItem = document.createElement("li");

    const productDetails = `Product: ${productName}, Price: $${price}, Quantity: ${quantity}`;
    listItem.textContent = productDetails;


    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.className = "remove-btn";
    removeBtn.onclick = () => removeProduct(productName);

    listItem.appendChild(removeBtn);
    cartSummary.appendChild(listItem);
  });

  totalCost.textContent = calculateTotal();
}
document.getElementById("addProductForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const productName = document.getElementById("productName").value;
  const price = parseFloat(document.getElementById("price").value);
  const quantity = parseInt(document.getElementById("quantity").value, 10);

  addProduct(productName, price, quantity);
  // Clear form
  e.target.reset();
});
