const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const csrf = require('csurf');
const userRoutes = require('./routes/userRoutes');
const authRouter = require('./routes/Auth');
const jwt = require('jsonwebtoken');
const {mongoDB} = require('./config/database')

mongoDB()

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: 'http://localhost:5173', // Allow your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  credentials: true, // Allow cookies to be sent
}));

app.use(express.json());
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 1000 // 1 minute for demo
  }
}));

// JWT verification middleware
const authenticateJWT = (req, res, next) => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Invalid token
      req.email = user.email;
      next();
    });
  } else {
    res.sendStatus(401); // No token provided
  }
};

// CSRF protection middleware
const csrfProtection = csrf({ cookie: true });

// Apply CSRF protection to all routes except login and registration
app.use((req, res, next) => {
  const csrfExemptRoutes = ['/api/auth/github-login' ,'/api/auth/google-login', '/api/auth/login', '/api/auth/register', '/api/auth/subscribe' , '/api/auth/exists'];
  if (csrfExemptRoutes.includes(req.path)) {
    return next(); // Skip CSRF protection for exempt routes
  }
  csrfProtection(req, res, next);
});

// Apply JWT authentication to user routes, exempting login and registration
app.use('/api/users', authenticateJWT);

// Apply user routes
app.use('/api/users', userRoutes);

// Apply authentication routes
app.use('/api/auth', authRouter);

// Error handling middleware for CSRF errors
app.use((err, req, res, next) => {
  if (err.code === 'EBADCSRFTOKEN') {
    res.status(403).json({ message: 'Invalid CSRF token' });
  } else {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});