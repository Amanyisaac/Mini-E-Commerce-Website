// Product Management System
class ProductManager {
    constructor() {
        this.products = this.loadProducts();
    }

    loadProducts() {
        const savedProducts = sessionStorage.getItem('products');
        if (savedProducts) {
            return JSON.parse(savedProducts);
        }

        // Default products based on current website
        const defaultProducts = [
            {
                id: 1,
                name: "Short skirt",
                price: 60,
                image: "../imges/WhatsApp Image 2025-08-24 at 11.27.16_998d018e.jpg",
                brand: "adora",
                rating: 5
            },
            {
                id: 2,
                name: "Jacket",
                price: 76,
                image: "../imges/WhatsApp Image 2025-08-24 at 11.27.16_faf891c2.jpg",
                brand: "adora",
                rating: 5
            },
            {
                id: 3,
                name: "Formal Suit",
                price: 110,
                image: "../imges/WhatsApp Image 2025-08-24 at 11.27.17_6c4296ba.jpg",
                brand: "adora",
                rating: 5
            },
            {
                id: 4,
                name: "Long dress",
                price: 58,
                image: "../imges/WhatsApp Image 2025-08-24 at 11.27.17_8f52756a.jpg",
                brand: "adora",
                rating: 5
            },
            {
                id: 5,
                name: "Casual suit",
                price: 89,
                image: "../imges/suit2.jpg",
                brand: "adora",
                rating: 5
            },
            {
                id: 6,
                name: "Long black dress",
                price: 65,
                image: "../imges/WhatsApp Image 2025-08-24 at 11.38.55_b54dd7da.jpg",
                brand: "adora",
                rating: 5
            },
            {
                id: 7,
                name: "Long red dress",
                price: 83,
                image: "../imges/kate-skumen-PJRabkuH3_Q-unsplash.jpg",
                brand: "adora",
                rating: 5
            },
            {
                id: 8,
                name: "Long cotton dress",
                price: 80,
                image: "../imges/kate-skumen-XsFiUIamdTo-unsplash.jpg",
                brand: "adora",
                rating: 5
            },
            {
                id: 9,
                name: "Jeans suit",
                price: 110,
                image: "../imges/jeans suit.jpg",
                brand: "adora",
                rating: 5
            },
            {
                id: 10,
                name: "Long black coat",
                price: 62,
                image: "../imges/pexels-pixabay-157675.jpg",
                brand: "adora",
                rating: 5
            }
        ];

        this.saveProducts(defaultProducts);
        return defaultProducts;
    }

    saveProducts(products = this.products) {
        sessionStorage.setItem('products', JSON.stringify(products));
    }

    addProduct(product) {
        const newProduct = {
            id: Date.now(),
            name: product.name,
            price: parseFloat(product.price),
            image: product.image,
            brand: "adora",
            rating: 5
        };
        this.products.push(newProduct);
        this.saveProducts();
        return newProduct;
    }

    removeProduct(id) {
        this.products = this.products.filter(product => product.id !== parseInt(id));
        this.saveProducts();
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        return this.products.find(product => product.id === parseInt(id));
    }

    renderProducts(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = this.products.map(product => `
            <div class="pro" data-product-id="${product.id}">
                <img src="${product.image}" alt="${product.name}">
                <div class="des">
                    <span>${product.brand}</span>
                    <h5>${product.name}</h5>
                    <div class="star">
                        ${Array.from({length: product.rating}, () => '<i class="fas fa-star"></i>').join('')}
                    </div>
                    <h4>$${product.price}</h4>
                </div>
                <a href="#" class="add-to-cart" data-product-id="${product.id}">
                    <i class="fa-solid fa-cart-plus cart"></i>
                </a>
                <button class="btn btn-sm btn-danger remove-product" data-product-id="${product.id}" 
                        style="position: absolute; top: 10px; right: 10px; border-radius: 50%; width: 30px; height: 30px; padding: 0; z-index: 10;">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');

        // Add event listeners for cart and remove buttons
        this.attachProductListeners();
    }

    attachProductListeners() {
        // Add to cart listeners
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const productId = e.currentTarget.getAttribute('data-product-id');
                if (window.cartManager) {
                    window.cartManager.addToCart(parseInt(productId));
                }
            });
        });

        // Remove product listeners
        document.querySelectorAll('.remove-product').forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const productId = e.currentTarget.getAttribute('data-product-id');
                
                if (typeof Swal !== 'undefined') {
                    Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#d33',
                        cancelButtonColor: '#3085d6',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            this.removeProduct(productId);
                            this.renderProducts('pro-container');
                            Swal.fire({
                                title: 'Deleted!',
                                text: 'Product has been deleted.',
                                icon: 'success',
                                timer: 2000,
                                showConfirmButton: false
                            });
                        }
                    });
                } else {
                    if (confirm('Are you sure you want to delete this product?')) {
                        this.removeProduct(productId);
                        this.renderProducts('pro-container');
                        alert('Product deleted successfully!');
                    }
                }
            });
        });
    }
}

// Cart Management System
class CartManager {
    constructor() {
        this.cart = this.loadCart();
    }

    loadCart() {
        const savedCart = sessionStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    saveCart() {
        sessionStorage.setItem('cart', JSON.stringify(this.cart));
    }

    addToCart(productId, quantity = 1) {
        if (!window.productManager) return;
        
        const product = window.productManager.getProductById(productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: quantity
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                icon: 'success',
                title: 'Added to Cart!',
                text: `${product.name} has been added to your cart`,
                timer: 2000,
                showConfirmButton: false,
                toast: true,
                position: 'top-end'
            });
        } else {
            alert(`${product.name} added to cart!`);
        }
    }

    removeFromCart(productId) {
        this.cart = this.cart.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
        this.renderCart('cart-container');
    }

    updateQuantity(productId, quantity) {
        const item = this.cart.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveCart();
            this.updateCartDisplay();
            this.renderCart('cart-container');
        }
    }

    getCart() {
        return this.cart;
    }

    getTotalPrice() {
        return this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getTotalItems() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
    }

    clearCart() {
        if (typeof Swal !== 'undefined') {
            Swal.fire({
                title: 'Are you sure?',
                text: "This will remove all items from your cart",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Yes, clear it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    this.cart = [];
                    this.saveCart();
                    this.updateCartDisplay();
                    this.renderCart('cart-container');
                    Swal.fire({
                        title: 'Cleared!',
                        text: 'Your cart has been cleared.',
                        icon: 'success',
                        timer: 2000,
                        showConfirmButton: false
                    });
                }
            });
        } else {
            if (confirm('Are you sure you want to clear your cart?')) {
                this.cart = [];
                this.saveCart();
                this.updateCartDisplay();
                this.renderCart('cart-container');
                alert('Cart cleared!');
            }
        }
    }

    updateCartDisplay() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            cartCount.textContent = this.getTotalItems();
        }
        
        // Update cart badge in navbar
        const cartBadge = document.querySelector('#lg-bag a');
        if (cartBadge) {
            const currentContent = cartBadge.innerHTML;
            if (!currentContent.includes('cart-count')) {
                cartBadge.innerHTML = '<i class="fa-solid fa-bag-shopping"></i> <span class="cart-count badge bg-danger">' + this.getTotalItems() + '</span>';
            } else {
                const badge = cartBadge.querySelector('.cart-count');
                if (badge) {
                    badge.textContent = this.getTotalItems();
                }
            }
        }
    }

    renderCart(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        if (this.cart.length === 0) {
            container.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                    <h3>Your cart is empty</h3>
                    <p class="text-muted">Add some products to get started!</p>
                    <a href="shop.html" class="btn btn-primary">Continue Shopping</a>
                </div>
            `;
            return;
        }

        container.innerHTML = `
            <div class="cart-items">
                ${this.cart.map(item => `
                    <div class="cart-item card mb-3">
                        <div class="row g-0">
                            <div class="col-md-2">
                                <img src="${item.image}" class="img-fluid rounded-start" alt="${item.name}" style="height: 100px; object-fit: cover;">
                            </div>
                            <div class="col-md-10">
                                <div class="card-body">
                                    <h5 class="card-title">${item.name}</h5>
                                    <p class="card-text">$${item.price}</p>
                                    <div class="d-flex align-items-center">
                                        <button class="btn btn-outline-secondary btn-sm" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                                        <span class="mx-3">${item.quantity}</span>
                                        <button class="btn btn-outline-secondary btn-sm" onclick="cartManager.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                                        <button class="btn btn-danger btn-sm ms-auto" onclick="cartManager.removeFromCart(${item.id})">
                                            <i class="fas fa-trash"></i>
                                        </button>
                                    </div>
                                    <div class="mt-2">
                                        <strong>Subtotal: $${(item.price * item.quantity).toFixed(2)}</strong>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="cart-summary card mt-4">
                <div class="card-body">
                    <h4>Cart Summary</h4>
                    <div class="d-flex justify-content-between">
                        <span>Total Items:</span>
                        <span>${this.getTotalItems()}</span>
                    </div>
                    <div class="d-flex justify-content-between">
                        <strong>Total Price:</strong>
                        <strong>$${this.getTotalPrice().toFixed(2)}</strong>
                    </div>
                    <div class="mt-3">
                        <button class="btn btn-success w-100 mb-2" onclick="checkout()">Proceed to Checkout</button>
                        <button class="btn btn-outline-danger w-100" onclick="cartManager.clearCart()">Clear Cart</button>
                    </div>
                </div>
            </div>
        `;
    }
}

// Checkout function
function checkout() {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            icon: 'success',
            title: 'Order Placed!',
            text: 'Thank you for your purchase. Your order has been processed.',
            confirmButtonText: 'Continue Shopping'
        }).then(() => {
            window.cartManager.cart = [];
            window.cartManager.saveCart();
            window.cartManager.updateCartDisplay();
            window.cartManager.renderCart('cart-container');
            window.location.href = 'shop.html';
        });
    } else {
        alert('Order placed successfully! Thank you for your purchase.');
        window.cartManager.cart = [];
        window.cartManager.saveCart();
        window.cartManager.updateCartDisplay();
        window.cartManager.renderCart('cart-container');
        window.location.href = 'shop.html';
    }
}

// Initialize global instances
window.productManager = new ProductManager();
window.cartManager = new CartManager();
