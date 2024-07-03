const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

// Create user schema
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    followers: [String],
    following: [String],
});

// Create model of schema
const User = mongoose.model("User", userSchema);

// CRUD FUNCTIONS

// CREATE
async function register(username, password) {
    const user = await getUser(username);
    if (user) throw new Error('Username already in use');

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        username: username,
        password: hashed,
    });

    return newUser;
}

// LOGIN
async function login(username, password) {
    const user = await User.findOne({ username: username });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) throw new Error('Wrong Password');

    // Return user object without password
    const { password: _, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
}

// UPDATE PASSWORD
async function updatePassword(id, password) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.findOneAndUpdate(
        { _id: id }, { $set: { password: hashed } }, { new: true }
    );

    // Return user object without password
    const { password: _, ...userWithoutPassword } = user.toObject();
    return userWithoutPassword;
}

// DELETE
async function deleteUser(id) {
    await User.deleteOne({ _id: id });
}

// Utility functions
async function getUser(username) {
    return await User.findOne({ username: username });
}

// Export the User model and utility functions separately
module.exports = { User, register, login, updatePassword, deleteUser };
