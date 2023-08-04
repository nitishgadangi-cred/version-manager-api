const { db } = require("../utils/firebase");
const { getBundleId, isValidVersion, findLatestVersion } = require("../utils/versionHandler");
const constants = require("../utils/constants");

const getLatestBuildDetails = async (buildType, version) => {
    const bundleId = getBundleId(buildType);
    const document = db.collection(constants.DB_IOS_VERSIONING_COLLECTION).doc(bundleId);
    const documentData = (await document.get()).data() || {};
    const outputVersion = isValidVersion(version) ? version : documentData.latest;
    const versionsMap = documentData.versions;
    return {
        build_type: buildType,
        version: outputVersion,
        build: versionsMap[outputVersion] || 0,
    };
};

const getUpdatedBuildDetails = async (buildType, version) => {
    const latestBuild = await getLatestBuildDetails(buildType, version);
    const updatedVersion = latestBuild.version;
    const updatedBuildNumber = latestBuild.build + 1;
    updateVersionData(buildType, updatedVersion, updatedBuildNumber);
    return {
        build_type: buildType,
        version: updatedVersion,
        build: updatedBuildNumber,
    };
};

const updateVersionData = async (buildType, version, buildNumber) => {
    const bundleId = getBundleId(buildType);
    const document = db.collection(constants.DB_IOS_VERSIONING_COLLECTION).doc(bundleId);
    const documentData = (await document.get()).data() || {};
    documentData.versions[version] = buildNumber;
    const latestVersion = findLatestVersion(documentData.versions);
    documentData.latest = latestVersion;
    await document.set(documentData);
};

module.exports = { getLatestBuildDetails, getUpdatedBuildDetails };
