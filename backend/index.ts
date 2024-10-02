import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import csrf from "csurf";
import jwt from "jsonwebtoken";
import authRouter from "./src/Routes/AuthRoutes";
import taskRouter from "./src/Routes/TaskCreatorRoutes";
import initRouter from "./src/Routes/InitRoutes"
import workerRouter from "./src/Routes/WorkerRoutes";

import { mongoDB } from "./src/Config/Database";

mongoDB();

const app: Express = express();
const port: number = process.env.PORT ? parseInt(process.env.PORT) : 3000;

app.use(
  cors({
    origin: "https://shwet-latest.vercel.app", // Allow your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies to be sent
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(
  session({
    secret: process.env.JWT_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 60 * 1000, // 1 minute for demo
    },
  })
);

interface AuthenticatedRequest extends Request {
  email?: string;
  role?: string;
}
// JWT verification middleware
const authenticateJWT = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const token = req.cookies.token;
  if (token) {
    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
      (err: jwt.VerifyErrors | null, user: any) => {
        if (err) return res.sendStatus(403); // Invalid token
        req.email = user.email;
        req.role = user.role;
        next();
      }
    );
  } else {
    res.sendStatus(401); // No token provided
  }
};

// CSRF protection middleware
const csrfProtection = csrf({ cookie: true });

// Apply CSRF protection to all routes except login and registration
app.use((req: Request, res: Response, next: NextFunction): void => {
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
app.use('/api/task', taskRouter);
app.use('/api/init', initRouter);
app.use('/api/worker', workerRouter);

// Apply authentication routes
app.use("/api/auth", authRouter);

// Error handling middleware for CSRF errors
app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
  if (err.code === "EBADCSRFTOKEN") {
    res.status(403).json({ message: "Invalid CSRF token" });
    return;
  } else {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
