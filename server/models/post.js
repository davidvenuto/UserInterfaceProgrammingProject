// import mongoose
const mongoose = require("mongoose");

// create post schema
const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// create model of schema
const Post = mongoose.model("Post", postSchema);

// CRUD FUNCTIONS

// CREATE
async function createPost(userId, content) {
    const newPost = await Post.create({
        userId: userId,
        content: content
    });
    return newPost;
}

// READ
async function getPostsByUser(userId) {
    return await Post.find({ userId: userId });
}

async function getPostById(postId) {
    return await Post.findById(postId);
}

// UPDATE
async function updatePost(postId, userId, content) {
    const post = await Post.findOneAndUpdate (
        { _id: postId, userId: userId }, { $set: { content: content, updatedAt: Date.now() } }, { new: true }
    );
    if (!post) throw Error('Post not found');
    return post;
}

// DELETE
async function deletePost(postId, userId) {
    const result = await Post.deleteOne({ _id: postId, userId: userId });
    if (result.deletedCount === 0) throw Error('Post not found');
}

// export all functions we want to access in routes
module.exports = { createPost, getPostsByUser, getPostById, updatePost, deletePost };
