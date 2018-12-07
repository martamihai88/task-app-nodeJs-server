const mongoose = require('mongoose');

//card template
const cardSchema = mongoose.Schema({
  title: { type : String },
  content: { type : String},
  dueDays: Number,
  createDate: String,
  dueDate: String,
  progress: Number,
  type: { type : String, required: true},
  archived: Boolean
})

module.exports = mongoose.model('Card', cardSchema);