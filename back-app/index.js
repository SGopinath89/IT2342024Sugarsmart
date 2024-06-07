require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const { connectDB }= require('./config/db');
const userRouter = require("./routes/userRoute");
const glucoseRouter = require("./routes/glucoseRoute");

const app = express();

// Connect Database
connectDB();

app.use(express.json());

app.use("/api/user",userRouter);
app.use("/api/glt",glucoseRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));