const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const destinationRoutes = require("./routes/destinationRoutes");
const lessonRoutes = require("./routes/lessonRoutes");  
const tripRoutes = require("./routes/tripRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 // 1 day
    }
  })
);

// ==============================
// Routes
// ==============================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to Voyage Français API"
  });
});

// Auth Routes
app.use("/api/auth", authRoutes);

// Destination Routes
app.use("/api/destinations", destinationRoutes);

// API Routes
app.use("/api", require("./routes/api"));

// Lesson Routes
app.use("/api/lessons", lessonRoutes);

// Trip Routes
app.use("/api/trips", tripRoutes);

module.exports = app;