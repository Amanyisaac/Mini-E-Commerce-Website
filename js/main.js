 // Mobile Navigation
const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

// Authentication System
class Auth {
    constructor() {
        this.users = [
            { email: 'admin@adora.com', password: 'admin123', role: 'admin' },
            { email: 'user@adora.com', password: 'user123', role: 'user' }
        ];
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('userEmail', user.email);
            sessionStorage.setItem('userRole', user.role);
            return { success: true, user };
        }
        return { success: false, message: 'Invalid email or password' };
    }

    logout() {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userEmail');
        sessionStorage.removeItem('userRole');
        sessionStorage.removeItem('products');
        sessionStorage.removeItem('cart');
        window.location.href = 'login.html';
    }

    isAuthenticated() {
        return sessionStorage.getItem('isLoggedIn') === 'true';
    }

    getCurrentUser() {
        if (this.isAuthenticated()) {
            return {
                email: sessionStorage.getItem('userEmail'),
                role: sessionStorage.getItem('userRole')
            };
        }
        return null;
    }
}

// Global auth instance
const auth = new Auth();

// Page Protection
function checkAuthentication() {
    const currentPage = window.location.pathname;
    
    if (!auth.isAuthenticated() && !currentPage.includes('login.html')) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Logout functionality
function logout() {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out of your account",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, logout!'
        }).then((result) => {
            if (result.isConfirmed) {
                auth.logout();
            }
        });
    } else {
        if (confirm('Are you sure you want to logout?')) {
            auth.logout();
        }
    }
}

// Product detail page functionality
var MainImg = document.getElementById("MinImg");
var smallimg = document.getElementsByClassName("small-img");

if (smallimg.length > 0) {
    for (let i = 0; i < smallimg.length; i++) {
        smallimg[i].onclick = function() {
            if (MainImg) {
                MainImg.src = smallimg[i].src;
            }
        }
    }
}

// Page initialization
document.addEventListener('DOMContentLoaded', function() {
    // Skip authentication check for login page
    if (!window.location.pathname.includes('login.html')) {
        if (!checkAuthentication()) return;
        
        // Update navbar for authenticated users
        updateNavbar();
    }
});

function updateNavbar() {
    if (auth.isAuthenticated()) {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            // Check if logout button doesn't already exist
            if (!navbar.querySelector('.logout-btn')) {
                // Add logout button
                const logoutItem = document.createElement('li');
                logoutItem.innerHTML = '<a href="#" class="logout-btn" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Logout</a>';
                navbar.appendChild(logoutItem);
            }
        }
    }
}






