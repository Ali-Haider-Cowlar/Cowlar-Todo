require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const taskRoutes = require("./routes/task-routes");

const connectDB = require('./config/dbConn');
const PORT = process.env.MONGO_PORT || 5000;

connectDB();

const cors = require("cors");
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

//Routes
app.use("/task", taskRoutes); // localhost:5000/task

//Database Connection
mongoose.connection.once('open', () => {
    app.listen(PORT, () => console.log(`Connected to MongoDB: Server running on port ${PORT}`));
});
