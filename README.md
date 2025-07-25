# ⚡️ ElectroLocal — Electronics E-Commerce Website

A modern, single-page e-commerce platform for a local electronics shop.  
Browse, search, review, and buy electronics online. Mobile-friendly, pure front-end, with user authentication (login/signup).

---

## 🚀 Features

- **User Authentication**: Login/Signup page; guests cannot access main site
- **Shop Products**: Browse, search, sort, and filter electronic goods
- **Shopping Cart**: Add/remove products, update quantity, checkout with form
- **Order Tracking**: Each order gets a tracking ID; follow its delivery status
- **Product Reviews**: Post reviews with 5-star ratings and helpful voting
- **Customer Support**: Contact form styled as a support widget
- **Responsive & Stylish UI**: Fancy, glassy CSS and animated layouts

---

## 🖥️ Demo

1. Clone or download this repo
2. Launch `login.html` in your browser

---

## 📦 Folder Structure
```


├── login.html # Main login/signup page (entry)
├── electrolocal.html # Shop main page (protected)
├── auth.js # Handles authentication logic
├── main.js # Main navigation, rendering
├── cart.js # Cart/checkout
├── orderTracking.js # Order tracking
├── reviews.js # Review system
├── customerSupport.js # Customer support widget
├── products.js # Products data/filter/sort
├── style.css # All site styling
└── README.md


```
---

## 🔑 Login / Signup

- Start at **login.html**
- New users press “Sign up”, fill the form, and proceed to the shop
- User sessions are kept in `localStorage` until logout  
- To logout: Use the “Logout” button in the shop

_Default credentials example (if you sign up a user):_
- Email: `demo@demo.com`  
- Password: `1234`  

---

## 🛠️ Local Setup

1. **Clone this repo**:
    ```
    git clone https://github.com/yourusername/ElectroLocal.git
    cd ElectroLocal
    ```

2. 
    - You can open `login.html` directly,
    - _or_ use VSCode “Live Server” extension, _or_ run:
      ```
      npx live-server
      ```
      and navigate to [http://localhost:8080/login.html](http://localhost:8080/login.html)

3. **Login or Signup** and explore the e-commerce dashboard!  
   _You must authenticate before using the shop._

---

## 🤖 Tech Stack

- HTML5, CSS3 (modern glass/neon effects)
- Vanilla JavaScript (no frameworks, single-page)
- LocalStorage (all user/orders/sessions client-side)
- bcrypt.js


