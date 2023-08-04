const { getLatestBuildDetails, getUpdatedBuildDetails } = require("../services/appVersioningService");
const constants = require("../utils/constants");

const getLatestVersion = async (req, res) => {
    try {
        const buildType = req.params.build_type || constants.BUILD_TYPE_RELEASE;
        const inputVersion = req.params.version;
        const latestVersionDetails = await getLatestBuildDetails(buildType, inputVersion);
        res.status(200).json(latestVersionDetails);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const updateVersion = async (req, res) => {
    try {
        const buildType = req.body.build_type || constants.BUILD_TYPE_RELEASE;
        const inputVersion = req.body.version;
        const updatedVersionDetails = await getUpdatedBuildDetails(buildType, inputVersion);
        res.status(200).json(updatedVersionDetails);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

module.exports = { getLatestVersion, updateVersion };
