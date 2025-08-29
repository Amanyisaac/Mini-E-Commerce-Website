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

 class Auth {
    constructor() {
        this.users = [
            { email: 'admin@adora.com', password: 'admin123'},
        ];
    }

    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        if (user) {
            sessionStorage.setItem('isLoggedIn', 'true');
            sessionStorage.setItem('userEmail', user.email);
            return { success: true, user };
        }
        return { success: false, message: 'Invalid email or password' };
    }

    logout() {
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('userEmail');
        sessionStorage.removeItem('products');
        sessionStorage.removeItem('cart');
        
        // Check if we're in a subdirectory and redirect accordingly
        const currentPath = window.location.pathname;
        if (currentPath.includes('/html/')) {
            window.location.href = '../login.html';
        } else {
            window.location.href = './login.html';
        }
    }

    isAuthenticated() {
        return sessionStorage.getItem('isLoggedIn') === 'true';
    }

    getCurrentUser() {
        if (this.isAuthenticated()) {
            return {
                email: sessionStorage.getItem('userEmail'),
            };
        }
        return null;
    }
}

 const auth = new Auth();

 function checkAuthentication() {
    const currentPage = window.location.pathname;
    
    if (!auth.isAuthenticated() && !currentPage.includes('login.html')) {
        // Check if we're in a subdirectory and redirect accordingly
        if (currentPage.includes('/html/')) {
            window.location.href = '../login.html';
        } else {
            window.location.href = './login.html';
        }
        return false;
    }
    return true;
}

 function logout() {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: 'Are you sure?',
            text: "You will be logged out of your account",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#E76F51',
            cancelButtonColor: '#2C5F5D',
            confirmButtonText: 'Yes, logout!',
            cancelButtonText: 'Stay logged in',
            background: '#ffffff',
            color: '#2D3436',
            customClass: {
                popup: 'logout-popup',
                title: 'logout-title',
                content: 'logout-content'
            }
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

 document.addEventListener('DOMContentLoaded', function() {
     if (!window.location.pathname.includes('login.html')) {
        if (!checkAuthentication()) return;
        
         updateNavbar();
    }
    
    // Newsletter form functionality
    initializeNewsletter();
    
    // Banner countdown timer
    initializeCountdown();
});

function initializeNewsletter() {
    const newsletterBtn = document.querySelector('.newsletter-btn');
    const newsletterInput = document.querySelector('#newsletter input[type="email"]');
    
    if (newsletterBtn && newsletterInput) {
        newsletterBtn.addEventListener('click', handleNewsletterSubmit);
        
        // Handle Enter key in input
        newsletterInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleNewsletterSubmit();
            }
        });
    }
}

function handleNewsletterSubmit() {
    const input = document.querySelector('#newsletter input[type="email"]');
    const btn = document.querySelector('.newsletter-btn');
    
    if (!input || !btn) return;
    
    const email = input.value.trim();
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email) {
        showNewsletterMessage('Please enter your email address', 'error');
        return;
    }
    
    if (!emailRegex.test(email)) {
        showNewsletterMessage('Please enter a valid email address', 'error');
        return;
    }
    
    // Show loading state
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
    btn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        btn.innerHTML = originalText;
        btn.disabled = false;
        
        // Clear input
        input.value = '';
        
        // Show success message
        showNewsletterMessage(`Welcome aboard! Check your email for confirmation.`, 'success');
        
    }, 1500);
}

function showNewsletterMessage(message, type) {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            icon: type === 'error' ? 'error' : 'success',
            title: type === 'error' ? 'Oops!' : 'Success!',
            text: message,
            timer: 3000,
            showConfirmButton: false,
            toast: true,
            position: 'top-end',
            background: '#ffffff',
            color: '#1A1A1A',
            iconColor: type === 'error' ? '#EF4444' : '#10B981'
        });
    } else {
        alert(message);
    }
}

function initializeCountdown() {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        return; // Elements not found, probably not on home page
    }
    
    // Set sale end date (5 days from now for demo)
    const saleEndDate = new Date();
    saleEndDate.setDate(saleEndDate.getDate() + 5);
    saleEndDate.setHours(23, 59, 59, 999);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = saleEndDate.getTime() - now;
        
        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            daysElement.textContent = String(days).padStart(2, '0');
            hoursElement.textContent = String(hours).padStart(2, '0');
            minutesElement.textContent = String(minutes).padStart(2, '0');
            secondsElement.textContent = String(seconds).padStart(2, '0');
        } else {
            // Sale ended
            daysElement.textContent = '00';
            hoursElement.textContent = '00';
            minutesElement.textContent = '00';
            secondsElement.textContent = '00';
        }
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function updateNavbar() {
    if (auth.isAuthenticated()) {
        const navbar = document.getElementById('navbar');
        if (navbar) {
             if (!navbar.querySelector('.logout-btn')) {
                 const logoutItem = document.createElement('li');
                logoutItem.innerHTML = '<a href="#" class="logout-btn" onclick="logout()"><i class="fas fa-sign-out-alt"></i> Logout</a>';
                navbar.appendChild(logoutItem);
            }
        }
    }
}
