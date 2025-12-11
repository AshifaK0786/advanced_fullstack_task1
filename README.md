# E-Commerce MERN Application

A full-stack e-commerce application built with MERN (MongoDB, Express, React, Node.js) that includes product management, user authentication, and shopping cart functionality.

## Project Structure

```
ecommerce-app/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection configuration
│   ├── controllers/
│   │   ├── authController.js     # User registration, login, authentication
│   │   ├── productController.js  # Product CRUD operations
│   │   └── cartController.js     # Cart management operations
│   ├── middleware/
│   │   ├── authMiddleware.js     # JWT authentication middleware
│   │   └── adminMiddleware.js    # Admin role verification
│   ├── models/
│   │   ├── User.js               # User schema with password hashing
│   │   ├── Product.js            # Product schema
│   │   └── Cart.js               # Shopping cart schema
│   ├── routes/
│   │   ├── authRoutes.js         # Authentication endpoints
│   │   ├── productRoutes.js      # Product endpoints
│   │   └── cartRoutes.js         # Cart endpoints
│   ├── server.js                 # Express server setup
│   └── package.json              # Backend dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation component
│   │   │   ├── ProductCard.jsx   # Product card display
│   │   │   └── Footer.jsx        # Footer component
│   │   ├── pages/
│   │   │   ├── Home.jsx          # Home page with product listing
│   │   │   ├── ProductDetails.jsx # Single product details
│   │   │   ├── Cart.jsx          # Shopping cart page
│   │   │   ├── Login.jsx         # User login page
│   │   │   └── AdminAddProduct.jsx # Add product admin page
│   │   ├── App.jsx               # Main app component with routing
│   │   ├── index.js              # React DOM entry point
│   │   └── styles.css            # Global styles
│   └── package.json              # Frontend dependencies
│
└── README.md                      # Project documentation
```

## Features

### Backend Features
- **User Authentication**: Registration and login with JWT tokens
- **Password Hashing**: Secure password storage using bcryptjs
- **Product Management**: CRUD operations for products (admin only)
- **Shopping Cart**: Add, remove, and manage cart items
- **Role-Based Access**: Admin-only endpoints for product management
- **MongoDB Integration**: Data persistence with Mongoose ODM

### Frontend Features
- **Responsive Design**: Mobile-friendly interface
- **Product Browsing**: View all products with filtering
- **Product Details**: Detailed view with quantity selector
- **Shopping Cart**: Full cart management functionality
- **User Authentication**: Login system with token storage
- **Admin Panel**: Add new products
- **Modern UI**: Clean and intuitive user interface

## Technology Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT authentication
- **CORS** - Cross-origin resource sharing

### Frontend
- **React** - UI library
- **React Router** - Client-side routing
- **CSS3** - Styling
- **Fetch API** - HTTP requests

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to backend folder:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-secret-key-here
```

4. Start the server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend folder:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory (optional):
```
REACT_APP_API_URL=http://localhost:5000
```

4. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires authentication)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user's cart (requires authentication)
- `POST /api/cart/add` - Add item to cart (requires authentication)
- `POST /api/cart/remove` - Remove item from cart (requires authentication)
- `POST /api/cart/clear` - Clear entire cart (requires authentication)

## Authentication

The application uses JWT (JSON Web Tokens) for authentication:

1. User registers or logs in
2. Backend returns a JWT token
3. Token is stored in localStorage
4. Token is sent with requests in Authorization header: `Bearer <token>`
5. Protected routes verify the token before processing

## Admin Features

To access admin features:
1. Create a user account
2. Update the user in MongoDB and set `isAdmin: true`
3. Login and navigate to `/admin/add-product`
4. Add, update, or delete products

## Project Workflow

### User Journey
1. **Browse Products** - Visit home page to see all products
2. **View Details** - Click on a product to see full details
3. **Add to Cart** - Select quantity and add to shopping cart
4. **Checkout** - View cart and proceed to checkout (UI ready)
5. **Login** - Login required to complete purchases

### Admin Journey
1. **Login** - Admin user logs in
2. **Add Products** - Navigate to admin panel
3. **Manage Inventory** - Add, update, or delete products

## Database Schemas

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  isAdmin: Boolean,
  createdAt: Date
}
```

### Product Schema
```javascript
{
  name: String,
  description: String,
  price: Number,
  image: String (URL),
  category: String,
  stock: Number,
  rating: Number,
  reviews: Array,
  createdAt: Date
}
```

### Cart Schema
```javascript
{
  user: ObjectId (ref: User),
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number,
    price: Number
  }],
  totalPrice: Number,
  createdAt: Date,
  updatedAt: Date
}
```

## Security Features

- **Password Hashing**: Bcryptjs with salt rounds
- **JWT Tokens**: Secure token-based authentication
- **Protected Routes**: Backend middleware validates tokens
- **Admin Verification**: Admin-only endpoints checked
- **CORS**: Cross-origin requests configured

## Future Enhancements

- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Order management system
- [ ] Product reviews and ratings
- [ ] Search and filter functionality
- [ ] User profile management
- [ ] Email notifications
- [ ] Product recommendations
- [ ] Inventory management dashboard
- [ ] Analytics and reporting
- [ ] Wishlist functionality

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running locally or check Atlas connection string
- Verify `MONGODB_URI` in `.env` file

### CORS Errors
- Ensure backend server is running on port 5000
- Check `proxy` setting in frontend `package.json`

### Port Already in Use
- Backend: `lsof -i :5000` and kill process
- Frontend: `lsof -i :3000` and kill process

### Token Expiration
- Login again to get a new token
- Tokens expire after 7 days

## Contributing

1. Create a feature branch
2. Commit your changes
3. Push to the branch
4. Create a Pull Request

## License

MIT License - feel free to use this project for learning and development purposes.

## Support

For issues and questions, please create an issue in the repository or contact the development team.

---

Happy coding! 🚀
