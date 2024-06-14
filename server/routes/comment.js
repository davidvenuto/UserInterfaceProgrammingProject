// import necessary libraries
const express = require("express");
const Comment = require('../models/comment');
const router = express.Router();

// All of this is pretty boilerplate, super similar to other two routes
router
    .post('/create', async (req, res) => {
        try {
            const comment = await Comment.addComment(req.body.postId, req.body.userId, req.body.content);
            res.send(comment);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    })

    .get('/post/:postId', async (req, res) => {
        try {
            const comments = await Comment.getCommentsByPost(req.params.postId);
            res.send(comments);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    })

    .put('/update/:commentId', async (req, res) => {
        try {
            const comment = await Comment.updateComment(req.params.commentId, req.body.userId, req.body.content);
            res.send(comment);
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    })

    .delete('/delete/:commentId', async (req, res) => {
        try {
            await Comment.deleteComment(req.params.commentId, req.body.userId);
            res.send({ success: "Comment deleted" });
        } catch (error) {
            res.status(400).send({ message: error.message });
        }
    });

// export router
module.exports = router;
