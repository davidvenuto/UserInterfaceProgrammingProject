const express = require("express");
const { createPost, getPostsByUser, getPostById, updatePost, deletePost } = require('../models/post');
const router = express.Router();

// Create post
router.post('/create', async (req, res) => {
    try {
        const { userId, content } = req.body;
        if (!userId || !content) {
            return res.status(400).send({ message: 'User ID and content are required' });
        }
        const post = await createPost(userId, content);
        res.status(201).send(post);
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(400).send({ message: error.message });
    }
});

// Get posts by user
router.get('/user/:userId', async (req, res) => {
    try {
        const posts = await getPostsByUser(req.params.userId);
        res.send(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(400).send({ message: error.message });
    }
});

// Get post by ID
router.get('/:postId', async (req, res) => {
    try {
        const post = await getPostById(req.params.postId);
        res.send(post);
    } catch (error) {
        console.error('Error fetching post:', error);
        res.status(400).send({ message: error.message });
    }
});

// Update post
router.put('/update/:postId', async (req, res) => {
    try {
        const { userId, content } = req.body;
        if (!userId || !content) {
            return res.status(400).send({ message: 'User ID and content are required' });
        }
        const post = await updatePost(req.params.postId, userId, content);
        res.send(post);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(400).send({ message: error.message });
    }
});

// Delete post
router.delete('/delete/:postId', async (req, res) => {
    try {
        const { userId } = req.body;
        if (!userId) {
            return res.status(400).send({ message: 'User ID is required' });
        }
        await deletePost(req.params.postId, userId);
        res.send({ success: "Post deleted" });
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(400).send({ message: error.message });
    }
});

// Export router for use in index.js
module.exports = router;
