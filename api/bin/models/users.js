const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const AutoIncrement = require("mongoose-sequence")(mongoose);

const userSchema = new Schema(
  {
    name: { type: String, required: false },
    random_color: { type: String, required: false },
  },
  { timestamps: true }
);

// userSchema.plugin(AutoIncrement, { inc_field: "nameId" });

const User = mongoose.model("User", userSchema);
module.exports = User;
