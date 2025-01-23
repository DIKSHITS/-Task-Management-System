const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000; // Change to another port


// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
connectDB();

// Routes
app.use("/", authRoutes); // Ensure this path is correct

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
