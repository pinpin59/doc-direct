const { doubleCsrf } = require("csrf-csrf");
require("dotenv").config();

const doubleCsrfOptions = {
    getSecret: () => process.env.CSRF_SECRET,
    cookieName: "x-csrf-token",
    cookieOptions: {
        sameSite: "lax",
        path: "/",
        secure: false,
    },
    getTokenFromRequest: (req) => {
        if (req.headers["x-csrf-token"] != null) {
            console.log(req.headers["x-csrf-token"]);
            console.log("Cookies:", req.cookies);
            return req.headers["x-csrf-token"];
        } else {
            console.log(req.body);
            console.log("Cookies:", req.cookies);
            return req.body["_csrf"];
        }
    }
};

const { generateToken, doubleCsrfProtection } = doubleCsrf(doubleCsrfOptions);

module.exports = { generateToken, doubleCsrfProtection };