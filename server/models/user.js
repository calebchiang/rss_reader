const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true, maxLength: 100 },
    email: { type: String, required: true, unique: true, maxLength: 100 },
    password: { type: String, required: true },
});

UserSchema.virtual("url").get(function() {
    return `/user/${this._id}`;
});

module.exports = mongoose.model("User", UserSchema);