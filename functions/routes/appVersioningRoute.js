// eslint-disable-next-line new-cap
const router = require("express").Router();
const { getLatestVersion, incrementVersion, updateVersionStatus } = require("../controllers/appVersioningController");
const { isAuth } = require("../utils/authorisationHandler");

// Health check
router.get("/", (req, res) => {
    res.status(200).send("APP VERSIONING API IS ALIVE!");
});

// latest version with build number
router.post("/ios/latest", isAuth, getLatestVersion);

// incremented build number for a (latest if not)given version
router.post("/ios/increment", isAuth, incrementVersion);

// update the version db based on the build status
router.post("/ios/update", isAuth, updateVersionStatus);

module.exports = router;
