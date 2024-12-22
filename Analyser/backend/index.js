const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const chartDataRoutes = require("./routes/ChartData");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to Database
connectDB();
app.get("/", async (req, res) => {
    res.send("hello")
})
// Routes
app.use('/api/auth', authRoutes);
app.use("/api/chart", chartDataRoutes);

// Start Server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));