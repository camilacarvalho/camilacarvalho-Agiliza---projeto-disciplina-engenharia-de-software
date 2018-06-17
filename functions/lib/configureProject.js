"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
exports.configureProject = functions.firestore
    .document('projects/{projectId}').onCreate(snap => {
    const projectCreationRequest = snap.data();
    const defaultProjectThumbnail = 'fiery-cumbuca.appspot.com/projectThumbnails/defaultThumbnail.png';
    if (projectCreationRequest.thumbnail === '' ||
        projectCreationRequest.thumbnail.isNullOrUndefined()) {
        projectCreationRequest.thumbnail = defaultProjectThumbnail;
    }
    return admin.firestore().collection('projects')
        .doc(projectCreationRequest.Id).set(projectCreationRequest);
});
//# sourceMappingURL=configureProject.js.map