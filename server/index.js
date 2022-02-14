// server.js
require("dotenv").config();
const express = require("express");
const http = require("http");

const cors = require("cors"); // added

const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 8000;

// routes
const ad = require("./routes/ad"); // added

// cors
app.use(cors({ origin: true, credentials: true })); // added

// connect database
connectDB();

// initialize middleware
app.use(express.json({ extended: false }));
app.get("/", (req, res) => res.send("Server up and running"));

// use routes
app.use("/api/ad", ad); // added

// setting up port

const server = app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`);
});

var io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

let clients = [];
io.on("connection", (socket) => {
  console.log("new connection");
  // clients.push(socket);
  // let result = JSON.stringify(socket);
  // console.log(req);
  // console.log(clients[0]);
  // console.log(JSON.stringify(socket));
});

// app.get("/connections", (req, res) =>(
//   // let result=JSON.stringify(clients);
//   // res.json({ message: "Ad added successfully",result }))

// // );
