const constants = require("./constants");
const VERSION_REGEX = /^\d+\.\d+\.\d+$/;

const getBundleId = (buildType) => {
    if (buildType.toLowerCase() === constants.BUILD_TYPE_RELEASE) {
        return constants.CRED_BUNDLE_ID;
    }
    return constants.CREDQA_BUNDLE_ID;
};

const isValidVersion = (version) => VERSION_REGEX.test(version);

const compareVersions = (version1, version2) => {
    const arr1 = version1.split(".").map(Number);
    const arr2 = version2.split(".").map(Number);
    for (let i = 0; i < Math.max(arr1.length, arr2.length); i++) {
        const num1 = i < arr1.length ? arr1[i] : 0;
        const num2 = i < arr2.length ? arr2[i] : 0;
        if (num1 < num2) {
            return -1;
        } else if (num1 > num2) {
            return 1;
        }
    }
    return 0;
};

const findLatestVersion = (versionMap) => {
    const versions = Object.keys(versionMap);
    let latestVersion = null;
    versions.forEach((version) => {
        if (
            isValidVersion(version) &&
            (!latestVersion || compareVersions(version, latestVersion) === 1)
        ) {
            latestVersion = version;
        }
    });
    return latestVersion;
};

module.exports = { isValidVersion, findLatestVersion, getBundleId };
