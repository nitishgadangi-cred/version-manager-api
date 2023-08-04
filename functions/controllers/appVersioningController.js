const {
    getLatestBuildDetails,
    getUpdatedBuildDetails,
    revokeBuildIfPossible,
    updateVersionDataIfNeeded,
} = require("../services/appVersioningService");
const constants = require("../utils/constants");

const getLatestVersion = async (req, res) => {
    try {
        const buildType = req.body.build_type || constants.BUILD_TYPE_QA;
        const inputVersion = req.body.version;
        const latestVersionDetails = await getLatestBuildDetails(buildType, inputVersion);
        res.status(200).json(latestVersionDetails);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const incrementVersion = async (req, res) => {
    try {
        const buildType = req.body.build_type || constants.BUILD_TYPE_QA;
        const inputVersion = req.body.version;
        const updatedVersionDetails = await getUpdatedBuildDetails(buildType, inputVersion);
        res.status(200).json(updatedVersionDetails);
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

const updateVersionStatus = async (req, res) => {
    try {
        const buildType = req.body.build_type || constants.BUILD_TYPE_QA;
        const inputVersion = req.body.version;
        const inputBuildNumber = req.body.build;
        const buildSuccess = req.body.success;
        if (buildSuccess == true) {
            const response = await updateVersionDataIfNeeded(buildType, inputVersion, inputBuildNumber);
            return res.status(200).json(response);
        } else if (buildSuccess == false) {
            const response = await revokeBuildIfPossible(buildType, inputVersion, inputBuildNumber);
            return res.status(200).json(response);
        }
        res.status(404).send();
    } catch (error) {
        return res.status(500).json(error.message);
    }
};

module.exports = { getLatestVersion, incrementVersion, updateVersionStatus };
