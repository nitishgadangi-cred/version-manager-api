// Basic token based authorisation.
// Nothing fancy as there is no need for user level access.
const isAuth = (req, res, next) => {
    const authToken = req.headers.authorization;
    if (authToken === process.env.AUTH_TOKEN) {
        next();
    } else {
        res.status(401).send("Access forbidden");
    }
};

module.exports = { isAuth };
