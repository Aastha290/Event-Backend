const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../Models/userModel'); 

const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ error: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));
        req.user = await User.findById(decoded.user.id);
        if (!req.user) {
            return res.status(401).json({ error: 'User not found, authorization denied' });
        }
        next();
    } catch (err) {
        res.status(401).json({ error: 'Token is not valid' });
    }
};

module.exports = authMiddleware;
