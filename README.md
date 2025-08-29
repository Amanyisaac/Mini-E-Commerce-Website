# 🛍️ Adora - Mini E-Commerce Website

A comprehensive mini e-commerce website built with modern web technologies for the NTI Web Development Course Final Project.

![Adora Logo](imges/ADORA%20LOGO-preview.png)

## 🌟 Features

### 🔐 Authentication System
- **Secure Login**: Email and password validation
- **Hardcoded Credentials** for demo:
  - Admin: `admin@adora.com` / `admin123`
- **Session Management**: Protected routes and user state persistence
- **Auto-redirect**: Unauthorized users redirected to login page

### 🏠 Homepage
- **SwiperJS Slider**: Beautiful image carousel with autoplay
- **Responsive Design**: Mobile-first approach with Bootstrap
- **Feature Showcase**: Highlighting key benefits (Free Shipping, Online Order, etc.)
- **Product Preview**: Featured and new arrival sections

### 🛒 Product Management
- **Dynamic Product Display**: Array-based product management
- **CRUD Operations**: Add, view, and remove products
- **Real-time Updates**: DOM manipulation for instant feedback
- **Image Preview**: Live preview when adding products
- **Local Storage**: Persistent data storage

### 🛍️ Shopping Cart
- **Add to Cart**: One-click product addition
- **Quantity Management**: Increase/decrease item quantities
- **Real-time Totals**: Automatic price calculation
- **Remove Items**: Individual item removal with confirmation
- **Persistent Cart**: Saved across sessions
- **Checkout Flow**: Complete purchase simulation

### 📱 User Experience
- **SweetAlert Integration**: Beautiful alerts and confirmations
- **Bootstrap UI**: Modern, responsive interface
- **Font Awesome Icons**: Professional iconography
- **Loading States**: Smooth transitions and feedback
- **Error Handling**: Comprehensive validation and error messages

## 🚀 Technologies Used

- **HTML5**: Semantic markup and structure
- **CSS3**: Custom styling and animations
- **Bootstrap 5**: Responsive grid and components
- **JavaScript (ES6+)**: Modern JavaScript features
- **SwiperJS**: Touch-enabled slider
- **SweetAlert2**: Beautiful alert dialogs
- **Font Awesome**: Icon library
- **Local Storage**: Client-side data persistence

## 📁 Project Structure

```
FinalProject.NTI/
├── index.html              # Homepage with slider
├── login.html              # Authentication page
├── html/
│   ├── shop.html           # Products listing
│   ├── add-product.html    # Add new products
│   ├── about.html          # About page
│   ├── cart.html           # Shopping cart
│   └── product.html        # Product details
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   ├── main.js             # Core functionality
│   └── product-manager.js  # Product and cart management
├── imges/                  # Image assets
└── README.md               # Project documentation
```

## 🎯 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Web server (for local development)
 
### Demo Credentials
- **Admin**: `admin@adora.com` / `admin123`
## 🎮 Usage Guide

1. **Login**: Start at the login page with demo credentials
2. **Browse**: Explore the homepage with the interactive slider
3. **Shop**: View products in the dynamic products page
4. **Add Products**: Use the add product form to create new items
5. **Cart**: Add items to cart and manage quantities
6. **Checkout**: Complete the purchase flow
7. **About**: Learn more about the project and technologies

## 🎨 Design Features

- **Modern UI**: Clean, professional interface
- **Responsive Layout**: Works on all device sizes
- **Smooth Animations**: CSS transitions and effects
- **Interactive Elements**: Hover effects and dynamic content
- **Consistent Branding**: Unified color scheme and typography

## 🔧 Customization

### Adding New Products
Products are managed through JavaScript arrays. Default products are loaded from `product-manager.js`:

```javascript
const defaultProducts = [
    {
        id: 1,
        name: "Product Name",
        price: 99,
        image: "path/to/image.jpg",
        brand: "adora",
        rating: 5
    }
];
```

### Styling
Customize the appearance by modifying `css/style.css`. Key sections include:
- Color variables
- Typography settings
- Layout components
- Responsive breakpoints

## 📱 Responsive Design

The website is fully responsive with breakpoints for:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px
