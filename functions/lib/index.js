"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.createUser = functions.auth.user().onCreate(event => {
    const user = {
        name: event.displayName,
        firstName: "",
        lastName: "",
        photo: event.photoURL,
        role: "",
        city: "",
        state: "",
        country: "",
        bio: ""
    };
    return admin.firestore().collection('users').doc(event.uid).set(user);
});
exports.helloWorld = functions.https.onRequest((request, response) => {
    response.send("teste");
});
//# sourceMappingURL=index.js.map