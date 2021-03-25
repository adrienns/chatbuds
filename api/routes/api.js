var express = require("express");
var router = express.Router();
const Chats = require("../bin/models/chat.js");
const Users = require("../bin/models/users.js");

router.get("/chats", (req, res) => {
  Chats.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next(createError());
    });
});

router.get("/users", (req, res) => {
  Users.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      next(createError());
    });
});

// router.post("/send_message", (req, res) => {
//   const { text, name, latestTime, mostRecentId } = req.body;
//   const chat = new Chat({ name: name, text: text });
//   chat
//     .save()
//     .then((result) => {
//       Chat.find()
//         .where("messageId")
//         .gt(mostRecentId)
//         .then((result) => {
//           res.send(result);
//         })
//         .catch((err) => {
//           next(createError());
//         });
//     })
//     .catch((err) => {
//       next(createError());
//     });
// });

// router.post("/get_chat", (req, res) => {
//   Chat.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       next(createError());
//     });
// });

module.exports = router;
