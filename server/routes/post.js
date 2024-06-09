// import necessary libraries
const express = require("express");
const Post = require('../models/post');
const router = express.Router();

// create all routes to access database
router
    .post('/create', async (req, res) => {
        try {
            const post = await Post.createPost(req.body.userId, req.body.content);
            res.send(post);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    })

    .get('/user/:userId', async (req, res) => {
        try {
            const posts = await Post.getPostsByUser(req.params.userId);
            res.send(posts);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    })

    .get('/:postId', async (req, res) => {
        try {
            const post = await Post.getPostById(req.params.postId);
            res.send(post);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    })

    .put('/update/:postId', async (req, res) => {
        try {
            const post = await Post.updatePost(req.params.postId, req.body.userId, req.body.content);
            res.send(post);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    })

    .delete('/delete/:postId', async (req, res) => {
        try {
            await Post.deletePost(req.params.postId, req.body.userId);
            res.send({ success: "Post deleted" });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    });

// export router for use in index.js
module.exports = router;
