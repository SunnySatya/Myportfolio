const path = require("path");

try {
  require("dotenv").config({ path: __dirname + "/.env" });
} catch (error) {
  console.warn(
    "dotenv not installed at runtime; continuing without .env file support.",
  );
}

const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router/auth-router");
const contactRouter = require("./router/contact-router");
const adminRouter = require("./router/admin-router");
const connectDb = require("./utils/db");

// Proper CORS configuration
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:4173",
  "https://myportfolio.onrender.com",
  // Add any custom domains here
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"), false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "X-User-Email",
    ],
  }),
);

// Handle OPTIONS preflight requests explicitly (Express 5 compatibility)
// Note: Express 5 uses path-to-regexp v8+ which doesn't support bare "*"
// The cors middleware already handles OPTIONS via the app.use(cors()) above

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.use("/api/auth", router);
app.use("/api/form", contactRouter);
app.use("/api/admin", adminRouter);

// ---- Serve React build in production ----
const clientDistPath = path.join(__dirname, "..", "client", "dist");
app.use(express.static(clientDistPath));

// SPA fallback: serve index.html for any non-API request (client-side routing)
// Express 5 compatible (path-to-regexp v8 no longer supports bare "*" wildcard)
app.use((req, res, next) => {
  // Skip API routes
  if (req.path.startsWith("/api/")) {
    return next();
  }
  // Only handle GET/HEAD requests (let other methods fall through to 404)
  if (req.method !== "GET" && req.method !== "HEAD") {
    return next();
  }
  res.sendFile(path.join(clientDistPath, "index.html"), (err) => {
    if (err) {
      next();
    }
  });
});

// 404 handler for unknown API routes
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// Global error handling middleware (must always be registered last)
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.message || err);
  console.error("Error stack:", err.stack);
  res.status(500).json({
    message: "Internal server error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDb();
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
      console.log(`Health check: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message || error);
    process.exit(1);
  }
};

startServer();
