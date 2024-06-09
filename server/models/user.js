// import mongoose
const mongoose = require("mongoose");

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

    const newUser = await User.create({
        username: username,
        password: password,
    });

    return newUser;
}

async function login(username, password) {
    const user = await User.findOne({ username: username });
    if (!user) throw Error('User not found');
    if (user.password != password) throw Error('Wrong Password');

    return user;
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
