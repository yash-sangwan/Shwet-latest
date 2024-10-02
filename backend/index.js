import express, { Express, Request, Response, NextFunction } from "express";
import cors from "cors";
const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
app.use(
  cors({
    origin: "http://localhost:5173", // Allow your frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // Allow cookies to be sent
  })
);

app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET || "your_session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 1000, // 1 minute for demo
    },
  })
);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
