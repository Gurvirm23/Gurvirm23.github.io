const mobileMenuButton = document.querySelector('#mobile-menu');
const menu = document.querySelector('.navbar__menu');

mobileMenuButton.addEventListener('click', () => {
    menu.classList.toggle('active');
    mobileMenuButton.classList.toggle('is-active');
});


// Function to update the cart display
function updateCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');
    let totalPrice = 0;

    cartItemsContainer.innerHTML = '';

    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        cartItem.innerHTML = `
            <img src="images/${item.imageURL}" alt="${item.title}" class="cart-item__img">
            <div class="cart-item__info">
                <div class="cart-item__title">${item.title}</div>
                <div class="cart-item__price">CA$${item.price.toFixed(2)}</div>
                <div class="cart-item__quantity">
                    <label for="quantity-${index}">Quantity:</label>
                    <select id="quantity-${index}" name="quantity" data-index="${index}">
                        <option value="1" ${item.quantity === 1 ? 'selected' : ''}>1</option>
                        <option value="2" ${item.quantity === 2 ? 'selected' : ''}>2</option>
                        <option value="3" ${item.quantity === 3 ? 'selected' : ''}>3</option>
                        <option value="4" ${item.quantity === 4 ? 'selected' : ''}>4</option>
                        <option value="5" ${item.quantity === 5 ? 'selected' : ''}>5</option>
                    </select>
                </div>
                <button class="cart-item__remove" data-index="${index}">Remove</button>
            </div>
        `;

        cartItemsContainer.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });

    totalPriceElement.textContent = `CA$${totalPrice.toFixed(2)}`;

    document.querySelectorAll('.cart-item__remove').forEach(button => {
        button.addEventListener('click', (e) => {
            const index = e.target.getAttribute('data-index');
            removeFromCart(index);
        });
    });

    document.querySelectorAll('.cart-item__quantity select').forEach(select => {
        select.addEventListener('change', (e) => {
            const index = e.target.getAttribute('data-index');
            updateQuantity(index, parseInt(e.target.value));
        });
    });
}

// Function to remove an item from the cart
function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

// Function to update the quantity of an item in the cart
function updateQuantity(index, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart[index]) {
        cart[index].quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}

document.addEventListener('DOMContentLoaded', updateCart);
