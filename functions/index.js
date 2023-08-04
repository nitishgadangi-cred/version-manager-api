const functions = require("firebase-functions");
const express = require("express");

const versionManager = express();
versionManager.use(express.json());
versionManager.use(require("./routes/appVersioningRoute"));

exports.versionManager = functions.https.onRequest(versionManager);
