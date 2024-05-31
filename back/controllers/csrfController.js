const { generateToken } = require('../csrfConfig');

exports.getCsrfToken = (req, res) => {
    const csrfToken = generateToken(req, res);
    res.json({ csrfToken: csrfToken })
}