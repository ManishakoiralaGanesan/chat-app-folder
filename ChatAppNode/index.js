const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io", {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const io = new Server(server);

// app.get("/", (req, res) => {
//   console.log("server");
// });
io.on("connection", (socket) => {
  console.log("connect");
  io.emit("connection message", "some user connected");
  socket.on("disconnect", function () {
    console.log("disconnect");
    io.emit("connection message", "some user disconnected");
  });
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
    console.log("message", msg);
  });
});

server.listen(3001, () => {
  console.log("Listening app");
});
