const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");

mongoose.connect("mongodb://localhost/WhatsApp");

const userSchema = mongoose.Schema({
     name: String,
     username: {
          type: String,
          unique: true
     },
     password: String,
     mobile: String,
     read: {
          type: Boolean,
          default: false
     },
     profilePic: {
          type: String,
          default: "def.png"
     },
     story: {
          type: String,
          default: "def.png"
     }
})


mongoose.plugin(plm);
module.exports = mongoose.model("user", userSchema);