import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const configureProject = functions.firestore
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
    })

export const configureUser = functions.firestore.document('users/{userId}')
    .onCreate(snap => {
        const userCreationRequest = snap.data();
        const defaultProfilePic = "fiery-cumbuca.appspot.com/userProfilePictures/defaultProfile.png";

        if (userCreationRequest.profilePicture === '' ||
            userCreationRequest.profilePicture === null ||
            userCreationRequest.profilePicture === undefined){
            userCreationRequest.profilePicture = defaultProfilePic;
        }

        return admin.firestore().collection("users")
            .doc(userCreationRequest.id).set(userCreationRequest);
    });

