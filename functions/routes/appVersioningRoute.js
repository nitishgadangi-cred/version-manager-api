// eslint-disable-next-line new-cap
const router = require("express").Router();
const { getLatestVersion, updateVersion } = require("../controllers/appVersioningController");
const { isAuth } = require("../utils/authorisationHandler");

// Health check
router.get("/", (req, res) => {
    res.status(200).send("APP VERSIONING API IS ALIVE!");
});

// latest version with build number
router.get("/ios/latest/:build_type/:version?", isAuth, getLatestVersion);

// incremented build number for a (latest if not)given version
router.post("/ios/updated", isAuth, updateVersion);

module.exports = router;
