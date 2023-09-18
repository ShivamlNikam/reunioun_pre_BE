const mongoose = require('mongoose');

const AuthTokenSchema = new mongoose.Schema({
  id: { type: String, required: true },
  token: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  expires_at: { type: Date, required: true },
});

module.exports = mongoose.model('AuthToken', AuthTokenSchema);