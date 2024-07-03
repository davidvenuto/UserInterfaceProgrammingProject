const mongoose = require("mongoose");

// Create post schema with timestamps
const postSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
}, { timestamps: true });

// Create model of schema
const Post = mongoose.model("Post", postSchema);

// CRUD FUNCTIONS

// CREATE
async function createPost(userId, content) {
    if (!userId || !content) throw new Error('User ID and content are required');
    const newPost = await Post.create({ userId, content });
    return newPost;
}

// READ
async function getPostsByUser(userId) {
    if (!userId) throw new Error('User ID is required');
    return await Post.find({ userId });
}

async function getPostById(postId) {
    if (!postId) throw new Error('Post ID is required');
    return await Post.findById(postId);
}

// UPDATE
async function updatePost(postId, userId, content) {
    if (!postId || !userId || !content) throw new Error('Post ID, user ID, and content are required');
    const post = await Post.findOneAndUpdate(
        { _id: postId, userId },
        { $set: { content, updatedAt: Date.now() } },
        { new: true }
    );
    if (!post) throw new Error('Post not found');
    return post;
}

// DELETE
async function deletePost(postId, userId) {
    if (!postId || !userId) throw new Error('Post ID and user ID are required');
    const result = await Post.deleteOne({ _id: postId, userId });
    if (result.deletedCount === 0) throw new Error('Post not found');
}

// Export all functions we want to access in routes
module.exports = { createPost, getPostsByUser, getPostById, updatePost, deletePost };
