const jwt = require('jsonwebtoken');
const config = require('config');

const generateToken = (user) => {
    const payload = {
        user: {
            id: user.id
        }
    };

    return jwt.sign(payload, config.get('jwtSecret'), { expiresIn: '1h' });
};

module.exports = generateToken;
