const express = require('express');
const router = express.Router();
const { User, validate } = require('../models/user'); // Adjust the path if necessary
const bcrypt = require('bcrypt');

// Route for creating a new user
router.post('/', async (req, res) => {
    try {
        // Validate the request body
        console.log(req.body)
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        // Check if a user with the given email already exists
        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(409).send({ message: "User with given email already exists!" });

        // Hash the password
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // Create and save the new user
        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created successfully" });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
});

module.exports = router;
