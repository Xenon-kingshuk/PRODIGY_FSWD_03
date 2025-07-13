// Header adjustment for <768px
const toggle = document.querySelector(".toggle");
const menu = document.querySelector(".nav-menu");
function toggleMenu() {
    if (menu.classList.contains("active")) {
        menu.classList.remove("active");
        toggle.innerHTML = `<i class="fa fa-bars"></i>`;
    } else {
        menu.classList.add("active");
        toggle.innerHTML = `<i class="fa fa-times"></i>`;
    }
}
toggle.addEventListener("click", toggleMenu, false);

// Account Page: Toggle Login/Register
var logForm = document.getElementById("loginForm");
var regForm = document.getElementById("registerForm");
var remLog = document.getElementById("removeLog");
var remReg = document.getElementById("removeReg");

function login() {
    remLog.style.display = "none";
    remReg.style.display = "block";
    logForm.style.display = "flex";
    regForm.style.display = "none";
}

function register() {
    remReg.style.display = "none";
    remLog.style.display = "block";
    regForm.style.display = "flex";
    logForm.style.display = "none";
}

// Product Image Preview
var prodImg = document.getElementById("prodImg");
var smallImg = document.getElementsByClassName("small-img");
if (prodImg && smallImg.length > 0) {
    for (let i = 0; i < smallImg.length; i++) {
        smallImg[i].onclick = function () {
            prodImg.src = smallImg[i].src;
        }
    }
}

// ============================
// ADD TO CART FUNCTIONALITY
// ============================
document.addEventListener("DOMContentLoaded", () => {
    // Add to Cart Button Clicks
    const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
    addToCartButtons.forEach(button => {
        button.addEventListener("click", () => {
            const name = button.getAttribute("data-name");
            const price = parseFloat(button.getAttribute("data-price"));
            const img = button.getAttribute("data-img");

            const item = { name, price, image: img }; // updated to use 'image'

            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            cart.push(item);
            localStorage.setItem("cart", JSON.stringify(cart));

            alert(`${name} added to cart!`);
        });
    });

    // Cart Page Display with Remove Functionality
    const cartContainer = document.getElementById("cart-items");
    const totalContainer = document.getElementById("cart-total");

    if (cartContainer) {
        renderCart(); // Call renderCart on page load
    }

    function renderCart() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartContainer.innerHTML = "";
        let total = 0;

        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Your cart is empty.</p>";
            totalContainer.textContent = "";
            return;
        }

        cart.forEach((item, index) => {
            total += item.price;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");

            cartItem.innerHTML = `
                <div class="cart-item-details">
                    <img src="${item.image}" alt="${item.name}" />
                    <div>
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)}</p>
                    </div>
                </div>
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;

            cartContainer.appendChild(cartItem);
        });

        totalContainer.innerHTML = `Total: <span>$${total.toFixed(2)}</span>`;

        // Attach remove handlers
        document.querySelectorAll(".remove-btn").forEach(btn => {
            btn.addEventListener("click", () => {
                const index = parseInt(btn.getAttribute("data-index"));
                removeFromCart(index);
            });
        });
    }

    function removeFromCart(index) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1); // remove item
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart(); // re-render cart
    }
});

