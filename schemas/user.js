const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  role: String,
  email: String,
  active: Boolean,
  password: String
});

module.exports = mongoose.model('User', UserSchema);
