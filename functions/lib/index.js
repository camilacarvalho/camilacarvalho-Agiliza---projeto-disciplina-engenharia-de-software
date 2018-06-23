"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.configureProject = functions.firestore
    .document('projects/{projectId}').onCreate(snap => {
    const projectCreationRequest = snap.data();
    const defaultProjectThumbnail = 'fiery-cumbuca.appspot.com/projectThumbnails/defaultThumbnail.png';
    if (projectCreationRequest.thumbnail === '' ||
        projectCreationRequest.thumbnail === null ||
        projectCreationRequest.thumbnail === undefined) {
        projectCreationRequest.thumbnail = defaultProjectThumbnail;
    }
    return admin.firestore().collection('projects')
        .doc(projectCreationRequest.Id).set(projectCreationRequest);
});
exports.configureUser = functions.firestore.document('users/{userId}')
    .onCreate(snap => {
    const userCreationRequest = snap.data();
    const defaultProfilePic = "fiery-cumbuca.appspot.com/userProfilePictures/defaultProfile.png";
    if (userCreationRequest.profilePicture === '' ||
        userCreationRequest.profilePicture === null ||
        userCreationRequest.profilePicture === undefined) {
        userCreationRequest.profilePicture = defaultProfilePic;
    }
    return admin.firestore().collection("users")
        .doc(userCreationRequest.id).set(userCreationRequest);
});
exports.sendNotification = functions.firestore.document('notifications/{notificationId}')
    .onCreate((snap) => __awaiter(this, void 0, void 0, function* () {
    const notification = snap.data();
    const payload = {
        notification: {
            title: notification.type,
            body: notification.message
        }
    };
    const devicesToNotify = [];
    const userId = snap.data().userId;
    const devicesRef = admin.firestore().collection('devices')
        .where('userId', '==', notification.userId);
    const devices = yield devicesRef.get();
    devices.forEach(device => {
        devicesToNotify.push(device.data().token);
    });
    return admin.messaging().sendToDevice(devicesToNotify, payload);
}));
//# sourceMappingURL=index.js.map