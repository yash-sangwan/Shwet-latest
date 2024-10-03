"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_session_1 = __importDefault(require("express-session"));
const csurf_1 = __importDefault(require("csurf"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AuthRoutes_1 = __importDefault(require("./src/Routes/AuthRoutes"));
const TaskCreatorRoutes_1 = __importDefault(require("./src/Routes/TaskCreatorRoutes"));
const InitRoutes_1 = __importDefault(require("./src/Routes/InitRoutes"));
const WorkerRoutes_1 = __importDefault(require("./src/Routes/WorkerRoutes"));
const Database_1 = require("./src/Config/Database");
(0, Database_1.mongoDB)();
const app = (0, express_1.default)();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.use((0, cors_1.default)({
    origin: "https://shwet-latest.vercel.app", // Allow frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies to be sent
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 2 * 60 * 60 * 1000, // 2 hours max age
    },
}));
// JWT verification middleware
const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;
    console.log(req);
    console.log(req.cookies);
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err)
                return res.sendStatus(403); // Invalid token
            req.email = user.email;
            req.role = user.role;
            next();
        });
    }
    else {
        res.sendStatus(401); // No token provided
    }
};
// CSRF protection middleware
const csrfProtection = (0, csurf_1.default)({ cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'none', 
  } });
// Apply CSRF protection to all routes except login and registration
app.use((req, res, next) => {
    const csrfExemptRoutes = [
        "/api/auth/github-login",
        "/api/auth/google-login",
        "/api/auth/login",
        "/api/auth/register",
        "/api/auth/subscribe",
        "/api/auth/exists",
    ];
    if (csrfExemptRoutes.includes(req.path)) {
        return next(); // Skip CSRF protection for exempt routes
    }
    csrfProtection(req, res, next);
});
// Apply JWT authentication to user routes, exempting login and registration
app.use('/api/task', authenticateJWT);
app.use('/api/init', authenticateJWT);
app.use('/api/worker', authenticateJWT);
// Apply user routes
app.use('/api/task', TaskCreatorRoutes_1.default);
app.use('/api/init', InitRoutes_1.default);
app.use('/api/worker', WorkerRoutes_1.default);
// Apply authentication routes
app.use("/api/auth", AuthRoutes_1.default);
// Error handling middleware for CSRF errors
app.use((err, req, res, next) => {
    if (err.code === "EBADCSRFTOKEN") {
        res.status(405).json({ message: "Invalid CSRF token" });
        return;
    }
    else {
        next(err);
    }
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
exports.default = app;
