const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();

const dburi = process.env.MONGO_DB_URI;

const port = 3001;
const cors = require("cors");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cors());
app.use("/", require("./router/router.js"));
app.use(cookieParser());

async function connect() {
  try {
    await mongoose.connect(dburi);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

// call connect to connect to MongoDB database
connect();

app.listen(port, () =>
  console.log(`The server is connected to port :: ${port}`)
);
