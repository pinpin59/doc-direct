// middlewares/sanitizeMiddleware.js
const sanitizeHtml = require('sanitize-html');

const sanitizeInput = (req, res, next) => {
    const sanitize = (input) => {
        if (typeof input === 'string') {
            return sanitizeHtml(input, { allowedTags: [] });
        } else if (typeof input === 'object' && input !== null) {
            for (const key in input) {
                input[key] = sanitize(input[key]);
            }
        }
        console.log(input);
        return input;
    };

    req.body = sanitize(req.body);
    req.params = sanitize(req.params);
    req.query = sanitize(req.query);

    next();
};

module.exports = sanitizeInput;
