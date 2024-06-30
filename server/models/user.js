// import mongoose
const mongoose = require("mongoose");

//import bcrypt
const bcrypt = require('bcryptjs');

// create user schema
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    followers: [String],
    following: [String],
});

// create model of schema
const User = mongoose.model("User", userSchema);

// CRUD FUNCTIONS

// CREATE
async function register(username, password) {
    const user = await getUser(username);
    if (user) throw Error('Username already in use');

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        username: username,
        password: hashed,
    });

    return newUser;
}

async function login(username, password) {
    const user = await User.findOne({ username: username });
    if (!user) throw Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw Error('Wrong Password');

    return user._doc;
}

// UPDATE
async function updatePassword(id, password) {
    const user = await User.findOneAndUpdate(
        { _id: id }, { $set: { password: password } }, { new: true }
    );
    return user;
}

// DELETE
async function deleteUser(id) {
    await User.deleteOne({ _id: id });
}

// utility functions
async function getUser(username) {
    return await User.findOne({ username: username });
}

// export all functions we want to access in routes
module.exports = { register, login, updatePassword, deleteUser };
