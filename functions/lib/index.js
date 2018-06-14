"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.configureUser = functions.firestore.document('users/{userId}').onCreate(snap => {
    var configuredUser = snap.data();
    if (snap.data().profilePicture === null || snap.data().profilePicture === undefined || snap.data().profilePicture === "") {
        configuredUser.profilePicture = "gs://fiery-cumbuca.appspot.com/userProfilePictures/profiledefault.png";
    }
    return admin.firestore().collection("users").doc(snap.id).set(configuredUser);
});
//# sourceMappingURL=index.js.map