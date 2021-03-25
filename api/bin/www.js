#!/usr/bin/env node

/**
 * Module dependencies.
 */

var { app } = require("../app");
var debug = require("debug")("server:server");
var http = require("http");
const Chat = require("../bin/models/chat.js");
const User = require("../bin/models/users.js");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({ path: "api/.env" });

const MONGODB_URL = process.env.MONGODB_URL;

// connect to database

const dbURI = MONGODB_URL;

const connect = mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(process.env.PORT || "9000");
app.set("port", port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("join", ({ name, random_color }, callback) => {
    console.log("a user connected <333");

    connect.then((db) => {
      User.findOne({ name }, function (err, doc) {
        if (doc == null) {
          console.log("no it doesnt ");
          let user = new User({
            name: name,
            random_color: random_color,
          });
          user.save().then(() => {
            console.log("user saved");
            socket.broadcast.emit("message", {
              user: "admin",
              text: ` ${name}has joined the chat`,
              shouldFetchUsers: true,
            });
            callback();
          });
        } else {
          console.log("yeaahh it does exist " + name);
          socket.broadcast.emit("message", {
            user: "admin",
            text: ` ${name}has joined the chat`,
            shouldFetchUsers: true,
          });
          callback();
        }
      });
    });
  });

  socket.on("sendMessage", (message, name, callback) => {
    connect.then((db) => {
      console.log("connected to mongodb");

      User.findOne({ name })
        .then((result) => {
          if (result) {
            io.emit("message", {
              name: name,
              text: message,
              random_color: result.random_color,
            });
            callback();
            let chatMessage = new Chat({
              name: name,
              text: message,
              random_color: result.random_color,
            });
            chatMessage.save();
          } else {
            console.log("No match");
          }
        })
        .catch((err) => console.error(`Failed  ${err}`));
    });
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => console.log(`server is running on ${port}`));
server.on("error", onError);
server.on("listening", onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
