const express = require("express");
const mongoose = require("mongoose");
const app = express();

const dburi =
  "mongodb+srv://jamestier1203:Qg3N3xdHBZfuVp9R@cluster0.adhobvq.mongodb.net/?retryWrites=true&w=majority";

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
