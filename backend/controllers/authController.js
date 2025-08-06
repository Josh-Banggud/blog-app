const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

exports.signUp = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const userExists = await User.findOne({email});
        if (userExists) return res.status(400).json({message: 'Email already in use'});

        const hashed = await bcrypt.hash(password, 10);
        const user = await User.create({name, email, password: hashed});

        res.status(201).json({message: 'Signed up', user});
    } catch(err){
        res.status(500).json({message: 'Error signing up user', error: err.message});
    }
};

exports.login = async (req, res) => {
    const {email, password} = req.body;

    try{
        const userExists = await User.findOne({email});
        if (!userExists) return res.status(400).json({message: 'User not found'});

        const passMatch = await bcrypt.compare(password, userExists.password);
        if (!passMatch) return res.status(400).json({message: 'Invalid credentials'});

        const token = jwt.sign(
            {id: userExists._id, email: userExists.email},
            JWT_SECRET,
            {expiresIn: '7d'},
        );

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: userExists._id,
                name: userExists.name,
                email: userExists.email
            }
        });
    } catch(err){
        res.status(500).json({message: 'Server error', error: err.message});
    }
};

exports.getProfile = async (req, res) => {
    try{
        const userProfile = await User.findById(req.user.id).select('name email');
        
        res.status(200).json({userProfile});
    } catch(err){
        res.status(500).json({message: 'Server error', error: err.message});
    }
};

exports.updateProfile = async (req, res) => {
    try{
        const userId = req.user.id;
        const {name, email, password} = req.body;
        const updateFields = {name, email};

        if(password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateFields.password = hashedPassword;
        }
        
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateFields,
            {new: true, runValidators: true},
        ).select('-password');

        if(!updatedUser){
            return res.status(404).json({message: 'User not found'});
        }

        if(password || email) {
            res.status(200).json({message: 'User profile updated', user: updatedUser, forceLogout: true})
        } else{
            res.status(200).json({message: 'User profile updated', user: updatedUser, forceLogout: false})
        }
    } catch(err){
        res.status(500).json({message: 'Server error', error: err.message});
    }
};