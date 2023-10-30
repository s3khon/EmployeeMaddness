const mongoose = require("mongoose");

const EquipmentSchema = new mongoose.Schema({
  name: String,
  type: String,
  amount: String,
  created: {
    type: Date, 
    default: Date.now,
  }
});

module.exports = mongoose.model("Equipment", EquipmentSchema);
