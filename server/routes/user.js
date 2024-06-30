// import necessary libraries
const express = require("express");
const User = require('../models/user');
const router = express.Router();

router.get('/profile/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});


// create all routes to access database
    router.post('/login', async (req, res) => {
        try {
            const user = await User.login(req.body.username, req.body.password);
            res.send({...user, password: undefined});
        } catch(error) {
            res.status(401).send({ message: error.message });
        }
    })

    router.post('/register', async (req, res) => {
        try{
            const user = await User.register(req.body.username, req.body.password)
            res.send({...user, password: undefined});
        } catch(error) {
            res.status(401).send({ message: error.message });
        }
    })

    router.put('/update', async (req, res) => {
        try {
            const user = await User.updatePassword(req.body.id, req.body.password)
            res.send({...user, password: undefined});
        } catch(error) {
            res.status(401).send({ message: error.message });
        }
    })
    
    router.delete('/delete', async (req, res) => {
        try{
            const user = await User.deleteUser(req.body.id);
            res.send({ success: "Account deleted" });
        } catch(error) {
            res.status(401).send({ message: error.message });
        }
    })

    // export router for use in index.js
    module.exports = router;