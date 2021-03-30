const { io } = require("../www.js");
const Chat = require("../../bin/models/chat.js");
const User = require("../../bin/models/users.js");
const { connect } = require("../../app.js");

console.log(io);
io.on("connection", (socket) => {
  let userName = "";
  console.log(userName);
  socket.on("join", ({ name, random_color }, callback) => {
    userName = name;
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
              text: ` ${name} has joined the chat`,
              shouldFetchUsers: true,
            });

            callback();
          });
        } else {
          console.log("yeaahh it does exist " + name);
          socket.broadcast.emit("message", {
            user: "admin",
            text: ` ${name} has joined the chat`,
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
    socket.broadcast.emit("message", {
      user: "admin",
      text: ` ${userName} left the chat`,
    });

    console.log("user disconnected");
  });
});
