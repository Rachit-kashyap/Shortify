const mongoose = require("mongoose");

const linkSchema = mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  newUrl: {
    type: String,
    required: true
  }
 
});

const Link = mongoose.model("Link", linkSchema);

module.exports = Link; 
