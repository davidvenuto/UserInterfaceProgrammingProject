// import mongoose
const mongoose = require("mongoose");

// create comment schema
const commentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// create model of schema
const Comment = mongoose.model("Comment", commentSchema);

// CRUD FUNCTIONS

// CREATE
async function addComment(postId, userId, content) {
    const newComment = await Comment.create({
        postId: postId,
        userId: userId,
        content: content
    });
    return newComment;
}

// READ
async function getCommentsByPost(postId) {
    return await Comment.find({ postId: postId });
}

// UPDATE
async function updateComment(commentId, userId, content) {
    const comment = await Comment.findOneAndUpdate(
        { _id: commentId, userId: userId }, 
        { $set: { content: content, updatedAt: Date.now() } }, 
        { new: true }
    );
    if (!comment) throw Error('Comment not found or unauthorized');
    return comment;
}

// DELETE
async function deleteComment(commentId, userId) {
    const result = await Comment.deleteOne({ _id: commentId, userId: userId });
    if (result.deletedCount === 0) throw Error('Comment not found or unauthorized');
}

// export all functions we want to access in routes
module.exports = { addComment, getCommentsByPost, updateComment, deleteComment };
