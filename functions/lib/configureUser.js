"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
exports.configureUser = functions.firestore.document('users/{userId}')
    .onCreate(snap => {
    const userCreationRequest = snap.data();
    const defaultProfilePic = "fiery-cumbuca.appspot.com/userProfilePictures/profiledefault.png";
    if (userCreationRequest.profilePicture.isNullorUndefined() ||
        userCreationRequest.profilePicture === '') {
        userCreationRequest.profilePicture = defaultProfilePic;
    }
    return admin.firestore().collection("users")
        .doc(userCreationRequest.id).set(userCreationRequest);
});
//# sourceMappingURL=configureUser.js.map