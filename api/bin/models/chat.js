const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const AutoIncrement = require("mongoose-sequence")(mongoose);

const chatSchema = new Schema(
  {
    name: { type: String, required: false },
    text: { type: String, required: false },
    random_color: { type: String, required: false },
    messageId: {
      type: Number,
    },
  },
  { timestamps: true }
);

chatSchema.plugin(AutoIncrement, { inc_field: "messageId" });

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
