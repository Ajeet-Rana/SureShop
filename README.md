# SureShop -  E-Commerce Website

[CLICK ON IMAGE TO WATCH VIDEO![Screenshot 2024-12-12 172810](https://github.com/user-attachments/assets/4f435175-140e-43e1-967b-92a57bbbda4a)](https://www.youtube.com/watch?v=VDinVk-ti50)

## Table of Contents
1. [Project Overview](#project-overview)
2. [System Architecture](#system-architecture)
3. [Core Features](#core-features)
4. [Technology Stack](#technology-stack)
5. [Usage Instructions](#usage-instructions)
6. [UI Walkthrough](#ui-walkthrough)
7. [Database Schema](#database-schema)
8. [Performance Optimizations](#performance-optimizations)

---

## Project Overview
This e-commerce platform is a full-stack application designed to provide seamless online shopping experiences. It incorporates advanced features like role-based authentication, real-time product reviews, and an admin dashboard for effective management of products, users, and orders. It also includes a payment gateway for secure transactions and supports filtering, sorting, and pagination to enhance user experience.

---

## System Architecture
The system follows a modern three-tier architecture:
1. **Frontend**: Built with React and Redux for state management, providing a dynamic and responsive UI.
2. **Backend**: Node.js with Express serves as the backend, managing business logic and API routes.
3. **Database**: MongoDB stores user data, product details, reviews, orders, and role-based access control.

The architecture utilizes JWT tokens for secure and scalable role-based authentication.

---

## Core Features
1. **Role-Based Authentication**:
   - JWT-based authentication ensures secure login for users and administrators.
   - Different permissions for users and admins.

2. **Admin Dashboard**:
   - Add, update, and delete products, users, and orders.
   - Sales and stock charts provide insightful analytics.

3. **Product Browsing**:
   - Filter products by price and rating.
   - Sort products by relevance, price, and rating.
   - Pagination for optimized loading and navigation.

4. **Search Functionality**:
   - Real-time search on products to quickly find items.

5. **Real-Time Reviews**:
   - Users can leave reviews for products.
   - Reviews update dynamically.

6. **Cart and Checkout**:
   - Cart-based ordering system with easy management.
   - Integration with a secure payment gateway.

7. **Additional Features**:
   - Mobile-friendly responsive design.
   - Comprehensive error handling.
   - Multi-role user system.

---

## Technology Stack
### Frontend:
- **React**: For building the user interface.
- **Redux**: For state management.

### Backend:
- **Node.js**: Runtime environment.
- **Express**: Web framework for building RESTful APIs.

### Database:
- **MongoDB**: NoSQL database for efficient data storage and querying.

### Other Tools:
- **JWT**: For secure authentication.
- **Stripe/Other Payment Gateway**: For handling payments.

---

## Usage Instructions
1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Navigate to the project directory:
   ```bash
   cd ecommerce-website
   ```
3. Install dependencies for both frontend and backend:
   ```bash
   cd frontend
   npm install

   cd Backend
   npm install
   ```
4. Set up environment variables:
   - Create a `.env` file in the `server` folder with keys for database connection, JWT secret, and payment gateway credentials.

5. Start the application:
   ```bash
   # Start the backend
   npm run dev

   # Start the frontend
   npm start
   ```
6. Access the application at `http://localhost:3000`.

---

## UI Walkthrough
1. **Homepage**:
   - Displays featured products.
   - Search bar for quick navigation.
   - 

2. **Product Listing**:
   - Filters, sorting, and pagination for easy browsing.

3. **Product Details**:
   - Comprehensive product information.
   - Real-time review system.

4. **Admin Dashboard**:
   - Manage users, products, and orders.
   - Charts for sales and stock insights.

5. **Cart and Checkout**:
   - Easy cart management.
   - Secure payment processing.

---

## Database Schema
### Collections:
1. **Users**:
   - Fields: `name`, `email`, `password`, `role`, etc.
2. **Products**:
   - Fields: `name`, `description`, `price`, `rating`, `stock`, `category`, etc.
3. **Orders**:
   - Fields: `userId`, `products`, `totalPrice`, `paymentStatus`, etc.
4. **Reviews**:
   - Fields: `productId`, `userId`, `rating`, `comment`, etc.

---

## Performance Optimizations
1. **Database Indexing**:
   - Indexed fields for faster querying (e.g., price, rating).

2. **Efficient API Calls**:
   - Pagination and filtering to reduce data payload.

3. **Optimized React Rendering**:
   - Used memoization with `React.memo` and `useMemo`.

4. **Code Splitting**:
   - Leveraged React's lazy loading for dynamic imports.

5. **Caching**:
   - Implemented caching strategies for static assets.

6. **Server-Side Optimizations**:
   - Compressed responses using gzip.
   - Implemented rate-limiting and optimized database queries.

---

Feel free to explore the codebase and contribute!

