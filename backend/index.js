"use strict";
var express_1 = require("express");
var cors_1 = require("cors");
var cookie_parser_1 = require("cookie-parser");
var express_session_1 = require("express-session");
var csurf_1 = require("csurf");
var jsonwebtoken_1 = require("jsonwebtoken");
var AuthRoutes_1 = require("./Routes/AuthRoutes");
var TaskCreatorRoutes_1 = require("./Routes/TaskCreatorRoutes");
var InitRoutes_1 = require("./Routes/InitRoutes");
var WorkerRoutes_1 = require("./Routes/WorkerRoutes");
var Database_1 = require("./Config/Database");
(0, Database_1.mongoDB)();
var app = (0, express_1.default)();
var port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.use((0, cors_1.default)({
    origin: "http://localhost:5173", // Allow your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies to be sent
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)({
    secret: process.env.SESSION_SECRET || "your_session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 1000, // 1 minute for demo
    },
}));
// JWT verification middleware
var authenticateJWT = function (req, res, next) {
    var token = req.cookies.token;
    if (token) {
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, function (err, user) {
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
var csrfProtection = (0, csurf_1.default)({ cookie: true });
// Apply CSRF protection to all routes except login and registration
app.use(function (req, res, next) {
    var csrfExemptRoutes = [
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
app.use(function (err, req, res, next) {
    if (err.code === "EBADCSRFTOKEN") {
        res.status(403).json({ message: "Invalid CSRF token" });
        return;
    }
    else {
        next(err);
    }
});
app.listen(port, function () {
    console.log("Server running on port ".concat(port));
});
exports.default = app;
