const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        const user = new User({ email, password });
        await user.save();
        const token = jwt.sign({ email, id:user._id }, process.env.JWT_SECRET);
        res.status(201).json(token);
    } catch (error) {
        res.status(500).json({ message:'Error registering user'});
    }
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ email, id:user._id }, process.env.JWT_SECRET );
        res.status(200).json(token);
    }catch (error) {
        res.status(500).json({ message: 'Error logging in user' });
    }
}

exports.getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
            res.status(200).json(user);
    }catch (error) {
        res.status(500).json({ message: 'Error getting user' });
    }
}
