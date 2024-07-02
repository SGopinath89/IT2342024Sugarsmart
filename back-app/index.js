require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const cors = require('cors');
const { connectDB }= require('./config/db');
const userRouter = require("./routes/userRoute");
const glucoseRouter = require("./routes/glucoseRoute");
const foodRoutes = require('./routes/foodRoute');

const app = express();

// Connect Database
connectDB();

app.use(express.json());

app.use(cors());

app.use("/api/user",userRouter);
app.use("/api/glt",glucoseRouter);
app.use('/api/food', foodRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));