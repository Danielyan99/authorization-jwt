require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/index');
const cookieParser = require("cookie-parser");
const errorMiddleware = require('./middlewares/error-middleware');
const cors = require("cors");

const app = express()
const PORT = process.env.PORT || 4000


app.use(express.json({ extended: true }));
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));
app.use('/api', router);
app.use(errorMiddleware)

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    app.listen(PORT, () => {
      console.log(`Server started on Port: ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start();