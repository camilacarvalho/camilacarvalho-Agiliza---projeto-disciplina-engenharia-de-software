import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp();


 export const configureUser = functions.firestore.document('users/{userId}').onCreate(snap => {
    var configuredUser = snap.data();
    if(snap.data().profilePicture === null || snap.data().profilePicture === undefined || snap.data().profilePicture === ""){
        configuredUser.profilePicture = "gs://fiery-cumbuca.appspot.com/userProfilePictures/profiledefault.png";
    }
    return admin.firestore().collection("users").doc(snap.id).set(configuredUser);
 });


