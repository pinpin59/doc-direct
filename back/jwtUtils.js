const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET;

function generateToken(payload) {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' });
}

module.exports = {
    generateToken,
};
