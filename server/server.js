const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

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
  "http://localhost:5000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:4173",
  "http://127.0.0.1:5000",
  "https://myportfolio.onrender.com",
  "https://my-portfolio.onrender.com",
  // Add any custom domains here
];

const isAllowedOrigin = (origin) => {
  if (!origin) return true;

  if (allowedOrigins.includes(origin)) {
    return true;
  }

  const localHostPattern = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i;
  const renderPattern = /^https?:\/\/([a-z0-9-]+\.)*onrender\.com(?::\d+)?$/i;

  return localHostPattern.test(origin) || renderPattern.test(origin);
};

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin and allow local/render deployments
      if (isAllowedOrigin(origin)) {
        callback(null, true);
      } else {
        // For same-origin asset requests and public frontend access, allow it instead of failing with a 500.
        console.warn(`CORS blocked origin: ${origin || "no-origin"}`);
        callback(null, true);
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
const indexPath = path.join(clientDistPath, "index.html");

let hasClientBuild = fs.existsSync(indexPath);

if (!hasClientBuild) {
  console.log(
    "[deploy] Frontend build not found. Attempting to build client...",
  );
  try {
    execSync("npm install --include=dev && npm run build", {
      cwd: path.join(__dirname, "..", "client"),
      stdio: "inherit",
    });
    hasClientBuild = fs.existsSync(indexPath);
    if (hasClientBuild) {
      console.log("[deploy] Frontend build completed successfully.");
    }
  } catch (buildError) {
    console.error(
      "[deploy] Failed to build frontend:",
      buildError.message || buildError,
    );
  }
}

if (hasClientBuild) {
  app.use(express.static(clientDistPath));

  app.get(/^(?!\/api).*/, (req, res, next) => {
    if (req.path.startsWith("/api/")) {
      return next();
    }

    if (req.method !== "GET" && req.method !== "HEAD") {
      return next();
    }

    res.sendFile(indexPath, (err) => {
      if (err) {
        next(err);
      }
    });
  });
} else {
  app.get(/^(?!\/api).*/, (req, res) => {
    res.status(503).json({
      message:
        "Frontend build is missing. Run npm run build before starting the server.",
    });
  });
}

// 404 handler for unknown API routes
app.use((req, res) => {
  if (req.path.startsWith("/api/")) {
    return res
      .status(404)
      .json({ message: `Route ${req.originalUrl} not found` });
  }

  return res.status(404).send("Not Found");
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
