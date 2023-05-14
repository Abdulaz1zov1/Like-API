const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
  car_Id: {
    type: mongoose.Schema.ObjectId,
    ref: "Car",
  },
  user_Id: {
    type: mongoose.Schema.ObjectId,
    ref: "User"
  }
},{timestamps: true})

module.exports = mongoose.model("Like", likeSchema);