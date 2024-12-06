const mongoose = require("mongoose"); //thanks no problem
const { Schema, model } = require("mongoose");

const userSchema = new Schema({
	email: { type: String, unique: true, required: true },
	password: { type: String, required: true },
	name: { type: String, required: true },
});
// collection name
const User = model("User", userSchema);
module.exports = User;
